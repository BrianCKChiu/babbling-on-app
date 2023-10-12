import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "react-native-get-random-values";
import { DefaultLayout } from "../../components/layout/defaultLayout";
import { Center, Modal } from "native-base";

export default function TabAssessmentScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef<Camera | null>(null);
  const storage = getStorage();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // display modal if user has no camera permissions
  useEffect(() => {
    if (hasPermission) return;
    setShowModal(true);
  }, [hasPermission]);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takeAndUploadPicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      uploadImageToFirebase(photo.uri);
      setIsCameraVisible(false);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uniqueID = uuidv4();

    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, `images/${uniqueID}.jpeg`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("Image available at:", downloadURL);
      }
    );
  };

  async function requestCameraPermission() {
    if (permission?.granted === true) return;
    await Camera.requestCameraPermissionsAsync();
    setShowModal(false);
  }

  if (!true) {
    return (
      <DefaultLayout>
        <Center>
          <Modal isOpen={showModal}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Insufficient Camera Permissions</Modal.Header>
              <Modal.Body>
                <Text>
                  Please enable camera permissions in your device settings
                </Text>
                <Button
                  title="Close"
                  onPress={() => {
                    setShowModal(false);
                  }}
                />
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <Text>No access to camera</Text>
        </Center>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <View style={styles.container}>
        {isCameraVisible ? (
          <Camera ref={cameraRef} style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={toggleCameraType}
                style={styles.button}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <Button title="Take Picture" onPress={takeAndUploadPicture} />
            </View>
          </Camera>
        ) : (
          <Button
            title="Open Camera"
            onPress={() => setIsCameraVisible(true)}
          />
        )}
      </View>
    </DefaultLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
