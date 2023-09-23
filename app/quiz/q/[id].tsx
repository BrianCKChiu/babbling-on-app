import {
  Box,
  VStack,
  View,
  Text,
  Pressable,
  HStack,
  Center,
  Heading,
  Button,
  Select,
  ChevronDownIcon,
  Icon,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import { JSX, ReactElement, useState } from "react";
import { McqQuestion } from "../../../components/ui/quiz/question/mcqQuestion";

export default function Page() {
  return (
    <VStack>
      <McqQuestion
        submitAnswer={(answer) => {
          console.log(answer);
        }}
        choices={["a", "b", "c", "d"]}
      />
    </VStack>
  );
}
