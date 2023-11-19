import { HStack, VStack, Text, Circle, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { Achievement } from "../../../components/types/user/achievement";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../components/firebase";

export default function Page() {
  const [achievements, setAchivements] = useState<Achievement[]>([]);
  const [user, isLoading] = useAuthState(auth);

  //todo: get Firebase User Document Ref

  // load user achievements from Firebase
  useEffect(() => {
    if (user == null || isLoading) return;

    // todo: get document data
    //todo: save data into state
  });
  // display user's acquired achievements
  function renderAchievements() {
    const achievementsList: JSX.Element[] = [];
    achievements
      .filter((a) => a.dateAcquired == null)
      .map((achievement) => {
        achievementsList.push(
          <HStack
            key={achievement.id}
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
                  {achievement.title}
                </Text>
                <Text fontSize={"12px"}>{achievement.description}</Text>
                <Text fontSize={"12px"}>{achievement.dateAcquired ?? ""}</Text>
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
