// import { StyleSheet, TouchableOpacity } from "react-native";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../components/firebase";
// import { SvgUri } from "react-native-svg";

import { useLocalSearchParams } from "expo-router";
// import { Text, VStack, View, FlatList } from "native-base";
import { View } from "native-base";

import React, { useState, useEffect } from "react";
// import { Image } from "react-native";
// import { useUserStore } from "../../../components/stores/userStore";
// import SAHeaderSection from "../../../components/ui/selfAssessment/headerSection";
import DescriptionSection from "../../../components/ui/selfAssessment/descriptionSection";

// interface Course {
//   id?: string;
//   name: string;
//   description: string;
// }

// interface Lesson {
//   id?: string;
//   name: string;
//   description: string;
// }

interface Gesture {
  id?: string;
  phrase: string;
}

export default function Page() {
  const [gestureData, setGestureData] = useState<Gesture>();
  // const router = useRouter();

  // Get courseId param
  const { gestureId } = useLocalSearchParams();
  console.log(gestureId);

  useEffect(() => {
    fetch("http://localhost:8080/gesture/getGesture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gestureId }),
    })
      .then((response) => {
        // check for the response
        if (!response.ok) {
          return Promise.reject("Server Error");
        }
        return response.json();
      })
      .then((data) => {
        // .then accepts a callBack which returns a
        // set the courseData state variable to the fetched datafkdnjkdng
        console.log("Log before setGestureData:", data);
        setGestureData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect
  return (
    <View>
      {/* <SAHeaderSection text= {gestureData?.phrase} /> */}
      <DescriptionSection bodyText={gestureData?.phrase || ''} />
    </View>
  );
}
