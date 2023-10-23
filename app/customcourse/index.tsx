import { StyleSheet } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../components/firebase";
import { SvgUri } from "react-native-svg";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, VStack, View, FlatList } from "native-base";
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useUserStore } from '../../components/stores/userStore';
import SAHeaderSection from '../../components/ui/selfAssessment/headerSection';
import DescriptionSection from "../../components/ui/selfAssessment/descriptionSection";
import CustomButton from "../../components/ui/selfAssessment/customButton";

interface Course {
  id: string;
  name: string;
}

export default function Page(){

    const [courseData, setCourseData] = useState<Course[]>([]);
    const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/customCourses/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      // check for the response
      if (!response.ok) {
        return Promise.reject('Server Error');
      }
      return response.json();
    })
    .then(data => { // .then accepts a callBack which returns a 
      // set the courseData state variable to the fetched datafkdnjkdng
      setCourseData(data); 
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

    // useEffect
    return (
        <View>
            <SAHeaderSection text="Individual Course"/>
            <DescriptionSection bodyText="Insert Course description here"/>
            <CustomButton text="Start" buttonColor="white"  onPress={() => router.push("/selfAssessment")} />
        </View>
    )

}


// create a table that joins the two entities 