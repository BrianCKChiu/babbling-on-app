import {
  VStack,
  Box,
  Heading,
  HStack,
  Select,
  CheckIcon,
  Button,
  Text,
} from "native-base";
import { useState } from "react";
import { ProgressBar } from "../progressBar";

export function MatchingQuestionComponent({
  choices,
  submitAnswer,
}: {
  choices: string[];
  submitAnswer: (answer: string[]) => void;
}) {
  const a = ["a", "b", "c", "d"];
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([
    "",
    "",
    "",
    "'",
  ]);

  return (
    <VStack alignContent="space-between" h={"full"} display="flex">
      <Box
        h={200}
        px={10}
        pt={"20%"}
        bgColor="violet.600"
        borderBottomRadius={12}
      >
        <Heading bold={true} size="lg" mb={6} mt={10}>
          Match the Gestures
        </Heading>
      </Box>
      <VStack mt={"64px"} mx={"40px"} space={6} flex={1}>
        {a.map((_, index) => (
          <HStack alignItems={"center"} space={4} key={index}>
            <Box
              w={"95px"}
              h={"95px"}
              bgColor={"red.600"}
              borderRadius={"lg"}
            />
            <DropdownAnswer
              options={choices}
              onSelect={(selected) => {
                const newSelectedAnswer = [...selectedAnswer];
                newSelectedAnswer[index] = selected;
                setSelectedAnswer(newSelectedAnswer);
              }}
            />
          </HStack>
        ))}
      </VStack>
      <VStack mx={"45px"}>
        <ProgressBar />
        <Box w="full" h={110} pt={5}>
          <Button
            isDisabled={selectedAnswer.includes("")}
            backgroundColor="violet.600"
            h={"50px"}
            onPress={() => submitAnswer(selectedAnswer)}
            _disabled={{ backgroundColor: "violet.500" }}
          >
            <Text color="white">Next Question</Text>
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
}

function DropdownAnswer({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (option: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <Select
      selectedValue={value}
      minWidth="200"
      accessibilityLabel="Choose Service"
      placeholder="Choose Service"
      _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      onValueChange={(itemValue) => setValue(itemValue)}
    >
      {options.map((option) => (
        <Select.Item label={option} value={option} />
      ))}
    </Select>
  );
}
