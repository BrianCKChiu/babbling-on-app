import {
  VStack,
  Box,
  Heading,
  HStack,
  Center,
  Text,
  Pressable,
  Button,
  View,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { ProgressBar } from "../progressBar";

export function McqQuestion({
  choices,
  submitAnswer,
}: {
  choices: string[];
  submitAnswer: (answer: string) => void;
}) {
  const a = ["a", "b", "c", "d"];
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  return (
    <View mx={40} pt={50} h={"$full"} display="flex">
      <VStack flex={1}>
        {/* Image */}
        <Box
          alignSelf="center"
          w={"$full"}
          h={265}
          backgroundColor="$violet600"
          borderRadius={8}
        />
        {/* Question */}
        <Heading bold={true} mb={"$6"} mt={36}>
          What is this Gesture?
        </Heading>
        {/* Choices */}
        {a.map((choice, index) => (
          <Pressable
            key={choice}
            w={"$full"}
            h={65}
            borderColor="#D8D8D8"
            borderWidth={1}
            borderRadius={8}
            my={10}
            justifyContent="center"
            onPress={() => setSelectedAnswer(choice)}
            backgroundColor={
              selectedAnswer === choice ? "$violet600" : "transparent"
            }
          >
            <HStack
              display="flex"
              flexDirection="row"
              alignItems="center"
              space="md"
            >
              <Center h={44} w={44}>
                <Text
                  fontWeight="$semibold"
                  color={
                    selectedAnswer === choice ? "$secondary0" : "$secondary950"
                  }
                >
                  {index + 1}
                </Text>
              </Center>
              <Text
                color={
                  selectedAnswer === choice ? "$secondary0" : "$secondary950"
                }
              >
                {choice}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
      <ProgressBar />
      <Box w="$full" h={110} pt={20}>
        <Button
          disabled={selectedAnswer === ""}
          backgroundColor="$violet600"
          h={50}
          sx={{
            ":disabled": {
              backgroundColor: "$violet200",
            },
          }}
          onPress={() => submitAnswer(selectedAnswer)}
        >
          <Text color="$secondary0">Next Question</Text>
        </Button>
      </Box>
    </View>
  );
}
