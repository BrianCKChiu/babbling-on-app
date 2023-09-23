import { VStack, HStack, Box, Text } from "@gluestack-ui/themed";
import { useQuizStore } from "../../stores/quizStore";

export function ProgressBar() {
  const { currentQuestionIndex, questions } = useQuizStore();

  function getPercentage(): number {
    //return ((currentQuestionIndex + 1) / questions.length) * 100;
    return 20;
  }
  return (
    <VStack>
      <Text alignSelf="flex-end" size="xs">
        {/* {currentQuestionIndex + 1}/{questions.length} */}
        2/10
      </Text>
      <HStack w={"$full"} h={2}>
        <Box bgColor="$violet500" w={`${getPercentage()}%`} />
        <Box bgColor="$secondary200" w={`${100 - getPercentage()}%`} />
      </HStack>
    </VStack>
  );
}
