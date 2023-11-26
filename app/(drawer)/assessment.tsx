import { useRouter } from "expo-router";
import { Center, View } from "native-base";
import { StyleSheet, Text } from "react-native";
import React from "react";
import DescriptionSection from "@/ui/selfAssessment/descriptionSection";
import CustomButton from "@/ui/selfAssessment/customButton";
import { DefaultLayout } from "@/layout/defaultLayout";

export default function TabAssessmentScreen() {
  const router = useRouter();

  return (
    <DefaultLayout>
    <View w={"full"}>
      <Center width={200} height={200} bg="rgba(255, 230, 0, 0.4)" rounded="full" position="absolute" top="30%" left="65%" />
      <Center width={304.76} height={300} bg="rgba(255, 230, 0, 0.4)" rounded="full" position="absolute" top="5%" left="-10%"/>
      <Text style={styles.headerText}>ASL Self Assessment</Text>
      <DescriptionSection
        bodyText="Welcome to your personal hub for mastering ASL Alphabets! 
        Dive into a tailored experience where you can challenge your skills with 
        our intelligent Self-Assessment, 
        engage in focused Practice sessions, and keep tabs 
        on your journey!"
      />
      <CustomButton
        text="Self Assessment with AI"
        buttonColor="#FFED4B"
        onPress={() => router.push("/selfAssessment")}
      />
      <CustomButton
        text="Practice ASL"
        buttonColor="#FFED4B"
        onPress={() => router.push("/saPractice/")}
      />
      <CustomButton
        text="Historical Performance Tracking"
        buttonColor="#FFED4B"
        onPress={() => router.push("/historicalPerformanceTracking/")}
      />
    </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: "30%",
  },
});
