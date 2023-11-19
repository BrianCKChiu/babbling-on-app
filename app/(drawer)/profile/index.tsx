import React, { useEffect } from "react";
import { ProfileLayout } from "../../../components/layout/profileLayout";
import {
  View,
  HStack,
  VStack,
  Box,
  ZStack,
  Heading,
  Text,
  Circle,
  ScrollView,
  Pressable,
} from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../components/firebase";
import { useUserStore } from "../../../components/stores/userStore";
import { getLevelExp } from "../../../components/user/level";
import { Link, useNavigation } from "expo-router";

export default function Page() {
  const navigation = useNavigation();
  const [user, isLoading] = useAuthState(auth);
  const { level, currentExp } = useUserStore();
  useEffect(() => {
    console.log(currentExp / getLevelExp(level));
  }, [currentExp, level]);

  function renderCourseHistory() {
    const courses: JSX.Element[] = [];
    [1, 2, 3, 4].map(() => {
      courses.push(
        <HStack
          display={"flex"}
          justifyContent={"space-between"}
          bgColor={"white"}
          px={"12px"}
          py={"8px"}
          borderRadius={"8px"}
          borderWidth={"1px"}
          borderColor={"gray.200"}
        >
          <HStack display={"flex"} space={"12px"}>
            <Box
              bgColor={"gray.400"}
              h={"72px"}
              w={"72px"}
              borderRadius={"8px"}
            />
            <VStack>
              <Text fontSize={"16px"} fontWeight={"semibold"}>
                Shopping
              </Text>
              <Text fontSize={"14px"}>3 Lessons</Text>
              <Text color={"gray.500"} fontSize={"14px"}>
                By: Joe Bow
              </Text>
            </VStack>
          </HStack>
        </HStack>
      );
    });
    return courses;
  }
  return (
    <View>
      {!isLoading && (
        <ProfileLayout>
          <VStack display={"flex"} space={"16px"}>
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
                borderColor={"gray.300"}
              >
                <Box
                  bgColor={"amber.300"}
                  h={"full"}
                  w={`${currentExp / getLevelExp(level + 1)}%`}
                  maxW={"full"}
                />
              </Box>
            </VStack>
            {/* Achievements */}
            <VStack mb={"12px"}>
              <HStack
                display={"flex"}
                justifyContent={"space-between"}
                pb={"12px"}
              >
                <Heading>Achievements</Heading>
                <Box alignSelf={"flex-end"}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate({
                        name: "achievements",
                      } as never);
                    }}
                  >
                    <Text>See More</Text>
                  </Pressable>
                </Box>
              </HStack>
              <HStack display={"flex"} justifyContent={"space-between"}>
                <Circle h={"48px"} w={"48px"} bgColor={"amber.200"} />
                <Circle h={"48px"} w={"48px"} bgColor={"amber.200"} />
                <Circle h={"48px"} w={"48px"} bgColor={"amber.200"} />
                <Circle h={"48px"} w={"48px"} bgColor={"amber.200"} />
                <Circle h={"48px"} w={"48px"} bgColor={"amber.200"} />
                <Circle h={"48px"} w={"48px"} bgColor={"amber.200"} />
                <Circle h={"48px"} w={"48px"} bgColor={"amber.200"} />
              </HStack>
            </VStack>
            {/* My Courses */}
            <Pressable onPress={() => {}}>
              <HStack
                display={"flex"}
                justifyContent={"space-between"}
                py={"16px"}
                px={"24px"}
                mb={"12px"}
                borderRadius={"8px"}
                bgColor={"white"}
              >
                <Text fontSize={"20px"} fontWeight={"semibold"}>
                  My Courses
                </Text>
              </HStack>
            </Pressable>
            {/* Course History */}
            <VStack>
              <HStack
                display={"flex"}
                justifyContent={"space-between"}
                pb={"12px"}
              >
                <Heading>Course History</Heading>
                <Box alignSelf={"flex-end"}>
                  <Link href={"/(drawer)/profile/achievements"}>See All</Link>
                </Box>
              </HStack>
              <ScrollView maxH={"80%"}>
                <VStack display={"flex"} space={"12px"}>
                  {renderCourseHistory()}
                </VStack>
              </ScrollView>
            </VStack>
          </VStack>
        </ProfileLayout>
      )}
    </View>
  );
}
