import { useLocalSearchParams, useRouter } from "expo-router";

import React from "react";

import { View, Text, StyleSheet } from "react-native";
// import DescriptionSection from "../../components/ui/selfAssessment/descriptionSection";
// import { HStack } from "native-base";
// import NextPageButton from "../../components/ui/selfAssessment/nextPageButton";
import CustomButton from "../../components/ui/selfAssessment/customButton";

export default function results() {
  const router = useRouter();
  const { length, score } = useLocalSearchParams();
  const lengthInt = parseInt(length as string, 10);
  const scoreInt = parseInt(score as string, 10);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>Results</Text>
      </View>
      <Text style={styles.questionText}>Final Score: {scoreInt * 100}</Text>
      <Text style={styles.questionText}>
        You got {scoreInt * lengthInt}/{lengthInt} correct
      </Text>
      <CustomButton
        text="Exit Assessment"
        onPress={() => router.push("/(drawer)/assessment")}
        buttonColor={"white"}
      ></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFE874",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: "7%",
    marginTop: "2%",
  },
  headerSection: {
    marginTop: "20%",
  },
  questionText: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: "10%",
    marginTop: "10%",
    marginBottom: "5%",
  },
});
