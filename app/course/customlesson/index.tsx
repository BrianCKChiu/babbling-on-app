// import { StyleSheet, TouchableOpacity } from "react-native";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../components/firebase";
// import { SvgUri } from "react-native-svg";

import { useLocalSearchParams, useRouter } from "expo-router";
// import { Text, VStack, View, FlatList } from "native-base";
import { View, Text } from "native-base";

import React, { useState, useEffect } from "react";
// import { Image } from "react-native";
// import { useUserStore } from "../../../components/stores/userStore";
import SAHeaderSection from "../../../components/ui/selfAssessment/headerSection";
import DescriptionSection from "../../../components/ui/selfAssessment/descriptionSection";
import CustomButton from "../../../components/ui/selfAssessment/customButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet } from 'react-native';


// helper
import { auth } from "../../../components/firebase";
import { get } from "lib0/indexeddb";

// interface Course {
//   id?: string;
//   name: string;
//   description: string;
// }

interface Lesson {
  id?: string;
  name: string;
  description: string;
  gestures: Gesture[]; 
}

interface Gesture {
  id?: string;
  phrase: string;
}

const gestureFetchFun = async (token: string, gestureId: string, setGestureData: Function) => {
// fetch call for gesture data

console.log("gestureId inside gestureFetchFun: ",gestureId);

const gestureResponse = await fetch('http://localhost:8080/gesture/getGesture', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  },
      body: JSON.stringify({ token, gestureId: gestureId }),
  })        

  if (!gestureResponse.ok) {
    console.log("SERVER ERROR");
    return Promise.reject("Server Error");
  }

  const gesture = await gestureResponse.json();
  console.log("gestureResponse inside gestureFetchFun: ", gesture);
  setGestureData(gesture);
}

// const description = () => {
//   const [lessonData, setLessonData] = useState<Lesson>();
//   const [user] = useAuthState(auth); 

//   const { lessonId } = useLocalSearchParams();
//   console.log("lessonId: ", lessonId);

//   useEffect(() => {
//     if (user == null) return;

//     const getFn = async () => {

//       // authenticate the user by getting a token for the session they're in
//       const token = await user.getIdToken();
//       if (!token || token === "") {
//         console.log("Token is empty or undefined");
//         return;
//       }
//       console.log("Token: ",token);

//       try{
//       // fetch call for lesson data
//         const lessonResponse = await fetch("http://localhost:8080/lesson/getLesson", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ lessonId }),
//     })
//       // .then((lessonResponse) => {
//       //   // check for the response

//         if (!lessonResponse.ok) {
//           console.log("SERVER ERROR");
//           return Promise.reject("Server Error");
//         }

//       //   return lessonResponse.json();
//       // })

//       // .then((data) => {
//       //   console.log("Log before setLessonData:", data);
//       //   setLessonData(data);
//       // })
//       // .catch((err) => {
//       //   console.log(err);
//       // });

//       // NOTE: 
//       // when adding a {} it means youre trying to get a property named whatvere is inside it from the data youre fetching 

//       const lesson = await lessonResponse.json();
//       console.log("LessonResponse after fetch: ", lesson);
//       setLessonData(lesson);

//       gestureFetchFun(token, lesson.gestures[0].id, setGestureData);
//       } catch (err) {
//         console.log("error within the try block: ",err);
//       }

//       // should still get the appropriate lesson data... 
//       console.log("lessonData: ", lessonData);
//       console.log("gestureData: ", gestureData);
//     }

//     getFn();
//   }, [])
// }

export default function Page() {
  const [lessonData, setLessonData] = useState<Lesson>();
  const [gestureData, setGestureData] = useState<Gesture>();
  const [user] = useAuthState(auth); 
  const router = useRouter();

  // store the image and the title and translation in a use state 
  const [info, setInfo] = useState({ 
    image: '', translation: '', Lessontitle: ''})

  // Get courseId param
  const { lessonId } = useLocalSearchParams();
  console.log("lessonId: ", lessonId);

  // call for the gesture data AND lesson data
  useEffect(() => {
    if (user == null) return;

    const getFn = async () => {

      // authenticate the user by getting a token for the session they're in
      const token = await user.getIdToken();
      if (!token || token === "") {
        console.log("Token is empty or undefined");
        return;
      }
      console.log("Token: ",token);

      try{
      // fetch call for lesson data
        const lessonResponse = await fetch("http://localhost:8080/lesson/getLesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonId }),
    })
      // .then((lessonResponse) => {
      //   // check for the response

        if (!lessonResponse.ok) {
          console.log("SERVER ERROR");
          return Promise.reject("Server Error");
        }

      //   return lessonResponse.json();
      // })

      // .then((data) => {
      //   console.log("Log before setLessonData:", data);
      //   setLessonData(data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });

      // NOTE: 
      // when adding a {} it means youre trying to get a property named whatvere is inside it from the data youre fetching 

      const lesson = await lessonResponse.json();
      console.log("LessonResponse after fetch: ", lesson);
      setLessonData(lesson);

      gestureFetchFun(token, lesson.gestures[0].id, setGestureData);
      } catch (err) {
        console.log("error within the try block: ",err);
      }

      // should still get the appropriate lesson data... 
      console.log("lessonData: ", lessonData);
      console.log("gestureData: ", gestureData);
    }

    getFn();
  }, [])

  // call for the lesson data 
  // useEffect(() => {
  //   const response = fetch("http://localhost:8080/lesson/getLesson", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ lessonId }),
  //   })
  //     .then((response) => {
  //       // check for the response
  //       if (!response.ok) {
  //         return Promise.reject("Server Error");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Log before setLessonData:", data);
  //       setLessonData(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect
  return (
    <View>
      <SAHeaderSection text={lessonData?.name || ''} />
      <DescriptionSection bodyText={lessonData?.description || ''} />
      <Text>{gestureData?.phrase}</Text>

       {/* map through the gesture array to render the gesture data  */}
      {lessonData?.gestures.map((gesture) => {
          return (
            <CustomButton
              key={gesture.id}
              text={gesture.phrase}
              buttonColor="white"
              style={stylingFun(gesture.id || "", gestureData?.id || "").button} // will only take button styling
              onPress={ async () =>
                {const token = await user?.getIdToken()
                  
                  gestureFetchFun(token || "", gesture.id || "", setGestureData);
            }
          }
            />
          )
      })}

      {/* <CustomButton
        text="Start"
        buttonColor="white"
        onPress={() =>
          router.push({
            pathname: "/course/customgesture",
            params: {
              gestureId: lessonData?.gestures[0].id || "", // renders one first gesture
              
            },
          })
        }
      /> */}
    </View>
  );
}

const stylingFun = (gestureId: string, currentGestureId: string) => {

  const styles = StyleSheet.create({
    button: { // because i dont have width: it will use the one from the parent aka customButton styling. 
    height: '10%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 29,
    marginLeft: 14,
    marginRight: 14,
    marginBottom:0,
    marginTop: '5%',
    backgroundColor: gestureId === currentGestureId? '#FFE500' : "white",
    borderWidth:1,
    borderColor:'#D8D8D8',
    color: gestureId === currentGestureId? "white" : 'black',
  },
  buttonText: {
    color: gestureId === currentGestureId? "white" : 'black',
    fontSize: 22,
    fontWeight: 'bold'
  },
});

return styles;
}