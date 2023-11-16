import { Box, HStack, VStack, Text, Heading, Pressable } from "native-base";
import React from "react";
import { View } from "react-native";
import IBlock from "../ui/IBlock";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserStore } from "../stores/userStore";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useRouter } from "expo-router";

export const DefaultLayout = ({ children, ...props }: IBlock) => {
  const { displayName, uid } = useUserStore();
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View {...props}>
      <VStack h={"full"} w="full" pt={"40px"} px={"16px"}>
        <HStack
          display={"flex"}
          flexDir={"row"}
          justifyContent={"end"}
          py={"8px"}
          mb={"4px"}
        >
          <Box flex={1} justifyContent={"center"}>
            <Heading color={"black"} size={"lg"}>
              <MaterialIcons
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                name="menu"
                size={24}
                color="black"
              />
            </Heading>
          </Box>
          <Pressable
            {...props}
            onPress={() => {
              router.push({
                pathname: "/profile",
                params: { id: uid },
              } as never);
            }}
          >
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
                <Text>{displayName}</Text>
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
        <Box>{children}</Box>
      </VStack>
    </View>
  );
};
