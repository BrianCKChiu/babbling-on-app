import { useRouter } from "expo-router";
import { View, Text, Heading, VStack, Button } from "native-base";
import { useEffect } from "react";
import { useQuizStore } from "../../../components/stores/quizStore";

export default function Page() {
  const { answers, quizName, clearQuiz } = useQuizStore();
  const router = useRouter();

  function handleExit() {
    // send answers to server

    clearQuiz();
    router.push("/(tabs)/");
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
        <Button w="full" onPress={() => handleExit()}>
          Exit Quiz
        </Button>
      </VStack>
    </View>
  );
}
