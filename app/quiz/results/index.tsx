import React from "react";
import { View, Text, Heading, VStack, Button } from "native-base";

import { useRouter } from "expo-router";
import { useQuizStore } from "@/stores/quizStore";
import { useAuthState } from "react-firebase-hooks/auth";

// helpers
import { auth } from "@/firebase";
import { HttpHandler } from "@/api/backend";

export default function Page() {
  const { answers, clearQuiz, quizId } = useQuizStore();
  const router = useRouter();
  const [user] = useAuthState(auth);

  async function handleExit() {
    const token = await user?.getIdToken();
    HttpHandler.post({
      endpoint: "quiz/submitAnswer",
      body: {
        token: token,
        results: answers,
        quizId: quizId,
      },
    }).catch((err) => {
      console.log(err);
    });
    clearQuiz();
    router.push("/(drawer)/home");
  }

  return (
    <View>
      <VStack
        mx="40px"
        alignItems={"center"}
        pt={"80px"}
        pb="40px"
        h={"full"}
        justifyContent={"space-between"}
        display={"flex"}
      >
        <VStack alignItems={"center"}>
          <Heading>Quiz Results</Heading>
          <Text fontSize={"lg"} pt={"15px"}>
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
