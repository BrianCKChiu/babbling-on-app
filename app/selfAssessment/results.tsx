import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
      <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/(drawer)/assessment")}
    >
      <Text style={styles.buttonText}>Exit Assessment</Text>
    </TouchableOpacity>
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
  button: {
    width: "90%",
    height: "7%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center", 
    margin:"5%",
    marginBottom:0,
    marginTop: "5%",
    borderWidth:1,
    borderColor:"#D8D8D8",
    backgroundColor: "#FFED4B",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
});
