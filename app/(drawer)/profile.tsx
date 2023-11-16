import React from "react";
import { ProfileLayout } from "../../components/layout/profileLayout";
import { HStack, VStack, Box, ZStack, Heading, Text } from "native-base";
export default function Page() {
  return (
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
              <Heading>Robin</Heading>
              <Text>Professor</Text>
              <Text>Test1@gmail.com</Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </ProfileLayout>
  );
}
