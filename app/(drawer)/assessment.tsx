import { useRouter } from "expo-router";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";
import SAHeaderSection from "@/ui/selfAssessment/headerSection";
import DescriptionSection from "@/ui/selfAssessment/descriptionSection";
import CustomButton from "@/ui/selfAssessment/customButton";

export default function TabAssessmentScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SAHeaderSection text="ASL Self Assessment" fontSize={32} />
      <DescriptionSection
        bodyText="Welcome to your personal hub for mastering ASL Alphabets! 
        Dive into a tailored experience where you can challenge your skills with 
        our intelligent Self-Assessment, 
        engage in focused Practice sessions, and keep tabs 
        on your journey!"
      />
      <CustomButton
        text="Self Assessment with AI"
        buttonColor="white"
        onPress={() => router.push("/selfAssessment")}
      />
      <CustomButton
        text="Practice ASL "
        buttonColor="white"
        onPress={() => router.push("/saPractice/")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
