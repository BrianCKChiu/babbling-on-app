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
  Image,
} from "native-base";
import React, { useState } from "react";
import { ProgressBar } from "../progressBar";

export function McqQuestionComponent({
  choices,
  mediaRef,
  submitAnswer,
}: {
  choices: string[];
  mediaRef: string;
  submitAnswer: (answer: string) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  return (
    <View mx={"45px"} pt={50} h={"full"} display="flex">
      <VStack flex={1}>
        {/* Image */}

        <Center>
          <Image
            source={{
              uri: mediaRef,
            }}
            key={mediaRef}
            alt="Alternate Text"
            h={265}
            w={"full"}
          />
        </Center>

        {/* Question */}
        <Heading bold={true} mb={6} mt={"36px"}>
          What is this Gesture?
        </Heading>
        {/* Choices */}
        {choices.map((choice, index) => (
          <Pressable
            key={choice}
            w={"full"}
            h={65}
            borderColor="#D8D8D8"
            borderWidth={1}
            borderRadius={8}
            my={2}
            justifyContent="center"
            onPress={() => setSelectedAnswer(choice)}
            backgroundColor={
              selectedAnswer === choice ? "violet.600" : "transparent"
            }
          >
            <HStack
              display="flex"
              flexDirection="row"
              alignItems="center"
              space="md"
            >
              <Center h={"44px"} w={"44px"}>
                <Text
                  fontWeight="semibold"
                  color={selectedAnswer === choice ? "white" : "black"}
                >
                  {index + 1}
                </Text>
              </Center>
              <Text color={selectedAnswer === choice ? "white" : "black"}>
                {choice}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
      <ProgressBar />
      <Box w="full" h={110} pt={5}>
        <Button
          isDisabled={selectedAnswer === ""}
          backgroundColor="violet.600"
          h={"50px"}
          onPress={() => {
            submitAnswer(selectedAnswer);
            setSelectedAnswer("");
          }}
          _disabled={{ backgroundColor: "violet.500" }}
        >
          <Text color="white">Next Question</Text>
        </Button>
      </Box>
    </View>
  );
}
