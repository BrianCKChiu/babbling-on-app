import React, { useEffect } from "react";
import { ProfileLayout } from "../../components/layout/profileLayout";
import {
  View,
  HStack,
  VStack,
  Box,
  ZStack,
  Heading,
  Text,
  Button,
} from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../components/firebase";
import { useUserStore } from "../../components/stores/userStore";
import { getLevelExp } from "../../components/user/level";
export default function ProfileScreen() {
  const [user, isLoading] = useAuthState(auth);
  const { addExp, level, currentExp } = useUserStore();
  useEffect(() => {
    console.log(currentExp / getLevelExp(level));
  }, [currentExp, level]);
  return (
    <View>
      {!isLoading && (
        <ProfileLayout>
          <VStack>
            <VStack>
              <HStack
                borderTopRadius={"8px"}
                display={"flex"}
                space={"12px"}
                px={"16px"}
                pt={"12px"}
                pb={"23px"}
                borderColor={"gray.200"}
                borderWidth={"1px"}
                w={"full"}
                bgColor={"white"}
              >
                <ZStack position={"relative"} w={"100px"} h={"110px"}>
                  <Box
                    bgColor={"blue.100"}
                    h={"100px"}
                    w={"100px"}
                    borderRadius={"8px"}
                  />
                  <Box
                    bgColor={"white"}
                    borderColor={"gray.500"}
                    borderWidth={"1px"}
                    borderRadius={"8px"}
                    h={"25px"}
                    w={"70px"}
                    position={"absolute"}
                    top={"85px"}
                    left={"15px"}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"semibold"}>{level}</Text>
                  </Box>
                </ZStack>
                <VStack pt={"12px"}>
                  <Heading maxW={"full"} overflow={"hidden"} noOfLines={1}>
                    {user?.displayName ?? user?.uid ?? "Unknown User"}
                  </Heading>
                  <Text>Professor</Text>
                  <Text>{user?.email}</Text>
                </VStack>
              </HStack>
              <Box
                width={"full"}
                h={"7px"}
                bgColor={"white"}
                borderWidth={"1px"}
              >
                <Box
                  bgColor={"amber.300"}
                  h={"full"}
                  w={`${currentExp / getLevelExp(level)}%`}
                  maxW={"full"}
                />
              </Box>
            </VStack>
            <Button onPress={() => addExp(1000, user?.uid as string)}>
              Add Exp
            </Button>
          </VStack>
        </ProfileLayout>
      )}
    </View>
  );
}
