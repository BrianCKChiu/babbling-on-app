import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "@/ui/selfAssessment/customButton";
import { Center } from "native-base";

export default function results() {
  const router = useRouter();
  const { length, score } = useLocalSearchParams();
  const lengthInt = parseInt(length as string, 10);
  const scoreInt = parseInt(score as string, 10);

  return (
    <View style={styles.container}>
      <Center width={304.76} height={300} bg="rgba(255, 230, 0, 0.4)" rounded="full" position="absolute" top="-5%" right="-20%" />
      <Center width={200} height={200} bg="rgba(255, 230, 0, 0.4)" rounded="full" position="absolute" top="30%" left="-25%"/>
      <Text style={styles.headerText}>Results</Text>
      <Text style={styles.questionText}>Final Score: {scoreInt * 100}</Text>
      <Text style={styles.questionText}>
        You got {scoreInt * lengthInt}/{lengthInt} correct
      </Text>
      <CustomButton
        text="Exit Assessment"
        onPress={() => router.push("/(drawer)/assessment")}
        buttonColor={"#FFED4B"}
      ></CustomButton>
    </View>
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
    marginTop: "0%",
  },
  questionText: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: "7%",
    marginTop: "10%",
    marginBottom: "5%",
  },
});
