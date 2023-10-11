import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Pressable,
  Menu,
} from "native-base";
import React from "react";
import { View } from "react-native";
import IBlock from "../ui/IBlock";

export const DefaultLayout = ({ children, ...props }: IBlock) => {
  return (
    <View {...props}>
      <VStack h={"full"} w="full" pt={"40px"}>
        <HStack
          display={"flex"}
          flexDir={"row"}
          justifyContent={"end"}
          px={"16px"}
          py={"8px"}
          mb={"4px"}
        >
          <Box flex={1} justifyContent={"center"}>
            <Heading color={"black"} size={"lg"}>
              Babbling On
            </Heading>
          </Box>
          <Pressable {...props}>
            <HStack display={"flex"} alignItems={"center"}>
              <Box
                maxW={"150px"}
                w={"container"}
                h={"30px"}
                pr={"40px"}
                pl={"8px"}
                mr={"-30px"}
                bgColor={"white"}
                borderLeftRadius={"lg"}
                display={"flex"}
                justifyContent={"center"}
                overflow={"hidden"}
                borderWidth={1}
                borderColor={"gray.300"}
              >
                <Text>Brian Chiu</Text>
              </Box>
              <Box
                bgColor={"white"}
                borderRadius={"full"}
                w={"48px"}
                h={"48px"}
                borderWidth={1}
                borderColor={"gray.300"}
              ></Box>
            </HStack>
          </Pressable>
        </HStack>
        <Box px={"16px"}>{children}</Box>
      </VStack>
    </View>
  );
};
