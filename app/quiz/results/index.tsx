import { useRouter } from "expo-router";
import { View, Text, Heading, VStack, Button } from "native-base";
import { useQuizStore } from "../../../components/stores/quizStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../components/firebase";
import React from "react";

export default function Page() {
  const { answers, clearQuiz, quizId } = useQuizStore();
  const router = useRouter();
  const [user] = useAuthState(auth);

  async function handleExit() {
    const token = await user?.getIdToken();

    // send answers to server
    fetch("http://localhost:8080/quiz/submitAnswer", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        results: answers,
        quizId: quizId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.log(err);
    });
    clearQuiz();
    router.push("/(tabs)/home");
  }

  return (
    <View>
      <VStack
        mx="40px"
        alignItems={"center"}
        py="40px"
        justifyContent={"space-between"}
        display={"flex"}
      >
        <VStack alignItems={"center"}>
          <Heading>Quiz Results</Heading>
          <Text>
            {answers.filter((a) => a.isCorrect).length} / {answers.length}
          </Text>
        </VStack>
        <Button w="full" onPress={async () => await handleExit()}>
          Exit Quiz
        </Button>
      </VStack>
    </View>
  );
}
