/* eslint-disable @typescript-eslint/no-unused-vars */
// import { auth } from "@/firebase";

import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "native-base";
import React, { useState, useEffect } from "react";
// import { useUserStore } from "../../../components/stores/userStore";
// import SAHeaderSection from "../../../components/ui/selfAssessment/headerSection";
import DescriptionSection from "../../../components/ui/selfAssessment/descriptionSection";
import { DisplayImage } from "../../../components/ui/selfAssessment/displayImage";

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
  //@ts-ignore
  mediaRef: any; // temporary any, will not be able to work in deployment
}

// export function GestureComponent({
//   mediaRef,
// } : {
//   mediaRef: string;
// }) {

// }

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
        console.log("Log after setGestureData:", gestureData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect
  return (
    <View>
      {/* <SAHeaderSection text= {gestureData?.phrase} /> */}
      {/* <DisplayImage path={`images/${}`} /> */}
      <DescriptionSection bodyText={gestureData?.phrase || ''} />
    </View>
  );
}
