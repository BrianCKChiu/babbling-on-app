import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "react-native-get-random-values";
import SAHeaderSection from "@/ui/selfAssessment/headerSection";
import imageAnalyzer from "@/selfAssessment/imageAnalyzer";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";

export default function selfAssessmentPage() {
  const router = useRouter();
  const { length, assessmentId } = useLocalSearchParams();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef<Camera | null>(null);
  const storage = getStorage();
  const [isMessageVisible, setIsMessageVisible] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState<{
    text: string;
    color: string;
  }>({ text: "", color: "" });
  const [isButtonClickable, setIsButtonClickable] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const lengthInt = parseInt(length as string, 10);
  //const [user] = useAuthState(auth);

  const questionString = `Question ${currentQuestion}/${length}`;

  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };
  const [currentLetter, setCurrentLetter] = useState(() => getRandomLetter());

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const updateScore = () => {
    const ex = (score * lengthInt + 1) / lengthInt;
    setScore(parseFloat(ex.toFixed(2)));
  };

  const handleNextClick = () => {
    if (currentQuestion < lengthInt) {
      setCurrentQuestion(currentQuestion + 1);
      enableButton();
      setIsMessageVisible(false);
      setCurrentLetter(getRandomLetter());
    } else {
      console.log(assessmentId);
      fetch(
        `http://localhost:8080/selfAssessment/end-assessment/${assessmentId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            score: score,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            return Promise.reject("Server Error");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Assessment Updated:", data);
        })
        .catch((err) => {
          console.error("Error:", err);
        });

      router.push({
        pathname: "/selfAssessment/results",
        params: { length: length, score: score },
      });
    }
  };

  const enableButton = () => {
    setIsButtonClickable((prevIsButtonClickable) => !prevIsButtonClickable);
  };

  const showMessage = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setMessageContent({
        text: "YOU WERE CORRECT!",
        color: "#A9F8AC",
      });
    } else {
      setMessageContent({
        text: "YOU WERE WRONG :(",
        color: "#F9B3A8",
      });
    }
    setIsMessageVisible(true);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takeAndUploadPicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);

      try {
        const downloadURL = await uploadImageToFirebase(photo.uri);
        //Analyzing the code using AI:
        const [success, isPredictionCorrect] = await imageAnalyzer(
          downloadURL,
          currentLetter
        );

        if (success && isPredictionCorrect) {
          showMessage(true); //if gesture is correct
          updateScore(); //updating score
        } else if (success && !isPredictionCorrect) {
          showMessage(false); //if gesture is incorrect
        } else {
          console.log("Error analyzing image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      enableButton();
      setIsCameraVisible(false);
    }
  };

  const uploadImageToFirebase = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uniqueID = uuidv4();

    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, `saImages/${uniqueID}.jpeg`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Image available at:", downloadURL);
          resolve(downloadURL);
        }
      );
    });
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <SafeAreaView style={styles.container}>
          <Camera ref={cameraRef} style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={toggleCameraType}
                style={styles.button}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takeAndUploadPicture}
                style={styles.button}
              >
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <SAHeaderSection
            text={questionString}
            fontSize={24}
          ></SAHeaderSection>
          <Text style={styles.bodyText}>
            Perform the gesture for: {currentLetter}
          </Text>
          <TouchableOpacity
            style={[
              styles.performGestureButton,
              {
                backgroundColor: !isButtonClickable ? "#FFED4B" : "#B0B0B0",
              },
            ]}
            onPress={() => setIsCameraVisible(true)}
            disabled={isButtonClickable}
          >
            <Text style={styles.buttonText}>Perform Gesture</Text>
          </TouchableOpacity>
          {isMessageVisible && (
            <View
              style={[
                styles.messageBox,
                { backgroundColor: messageContent.color },
              ]}
            >
              <Text style={styles.messageText}>{messageContent.text}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={handleNextClick}
            disabled={!isButtonClickable}
            style={[
              styles.nextButton,
              {
                backgroundColor: isButtonClickable ? "#FFED4B" : "#B0B0B0",
              },
            ]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  bodyText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: "10%",
    marginTop: "15%",
    marginBottom: "20%",
  },
  performGestureButton: {
    width: "78%",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: "4%",
    margin: "10%",
    marginBottom: "10%",
    marginTop: "10%",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  messageBox: {
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: "10%",
    marginBottom: "10%",
    marginTop: "0%",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    width: "80%",
    borderRadius: 8,
    padding: 30,
    paddingVertical: "5%",
    margin: "10%",
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: "auto",
  },
});
