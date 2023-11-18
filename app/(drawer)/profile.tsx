import React from "react";
import { ProfileLayout } from "../../components/layout/profileLayout";
import { View, HStack, VStack, Box, ZStack, Heading, Text } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../components/firebase";
export default function ProfileScreen() {
  const [user, isLoading] = useAuthState(auth);

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
              >
                <ZStack position={"relative"} w={"100px"} h={"110px"}>
                  <Box
                    bgColor={"blue.100"}
                    h={"100px"}
                    w={"100px"}
                    borderRadius={"8px"}
                  />
                  <Box
                    bgColor={"gray.200"}
                    borderColor={"black"}
                    borderWidth={"1px"}
                    borderRadius={"8px"}
                    h={"25px"}
                    w={"70px"}
                    position={"absolute"}
                    top={"85px"}
                    left={"15px"}
                  />
                </ZStack>
                <VStack pt={"12px"}>
                  <Heading maxW={"full"} overflow={"hidden"} noOfLines={1}>
                    {user?.displayName ?? user?.uid ?? "Unknown User"}
                  </Heading>
                  <Text>Professor</Text>
                  <Text>{user?.email}</Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </ProfileLayout>
      )}
    </View>
  );
}
