// import { StyleSheet } from "react-native";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../components/firebase";

// import { SvgUri } from "react-native-svg"; <- to fix icon issue

import { useRouter } from "expo-router";
// import { Text, VStack, View, FlatList } from "native-base";
import { View } from "native-base";
// import React, { useState, useEffect } from "react";
import React from "react";
// import { useUserStore } from "../../../components/stores/userStore";
import SAHeaderSection from "../../../components/ui/selfAssessment/headerSection";
import DescriptionSection from "../../../components/ui/selfAssessment/descriptionSection";
import CustomButton from "../../../components/ui/selfAssessment/customButton";

// interface Course {
//   id: string;
//   name: string;
// }

export default function Page() {
  // const [courseData, setCourseData] = useState<Course[]>([]);
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
