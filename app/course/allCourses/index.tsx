import { StyleSheet } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase";
import { SvgUri } from "react-native-svg";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, VStack, View, FlatList } from "native-base";
import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { useUserStore } from "@/stores/userStore";
import SAHeaderSection from "@/ui/selfAssessment/headerSection";
import DescriptionSection from "@/ui/selfAssessment/descriptionSection";
import CustomButton from "@/ui/selfAssessment/customButton";

interface Course {
  id: string;
  name: string;
}

export default function Page() {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const router = useRouter();

  // useEffect
  return (
    <View>
      <SAHeaderSection text="Individual Course" />
      <DescriptionSection bodyText="Insert Course description here" />
      <CustomButton
        text="Self Assessment with AI"
        buttonColor="white"
        onPress={() => router.push("/selfAssessment")}
      />
    </View>
  );
}
