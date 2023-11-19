import { HStack, VStack, Text, Circle, ScrollView } from "native-base";
import React, { useState } from "react";

export default function Page() {
  const [achievements, setAchivements] = useState(null);

  function renderAchievements() {
    const achievementsList: JSX.Element[] = [];
    [1, 2, 3, 4, 1, 2, 3, 4].map((_, index) => {
      achievements.push(
        <HStack
          key={index}
          display={"flex"}
          justifyContent={"space-between"}
          bgColor={"white"}
          px={"8px"}
          py={"8px"}
          mb={"8px"}
          borderRadius={"8px"}
          borderWidth={"1px"}
          borderColor={"gray.200"}
        >
          <HStack display={"flex"} space={"12px"}>
            <Circle bgColor={"amber.200"} h={"48px"} w={"48px"} />
            <VStack>
              <Text fontSize={"16px"} fontWeight={"semibold"}>
                Shopping
              </Text>
              <Text fontSize={"12px"}>3 Lessons</Text>
            </VStack>
          </HStack>
        </HStack>
      );
    });
    return achievementsList;
  }
  return (
    <VStack h={"97%"} w="full" pt={"100px"}>
      <ScrollView px={"24px"}>{renderAchievements()}</ScrollView>
    </VStack>
  );
}
