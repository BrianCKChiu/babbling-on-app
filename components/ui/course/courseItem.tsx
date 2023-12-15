import { Box, HStack, VStack, Text, Image} from "native-base";

import { Course } from "../../types/course/course";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export function CourseItem ({course}:{course: Course}){

    // initialize router
    const router = useRouter();

    return (
        <TouchableOpacity
        onPress={() =>
            router.push({
              pathname: "/customcourse", // edit
              params: {
                courseId: course.id,
              },
            })
          }>
        <HStack
          margin={'5px'}
          display={"flex"}
          justifyContent={"space-between"}
          bgColor={"white"}
          p={"8px"}
          borderRadius={"16px"}
          borderWidth={"1px"}
          borderColor={"gray.200"}
        >
          <HStack display={"flex"} space={"12px"}>
            <Box
            //   h={"72px"}
            //   w={"72px"}
            //   borderRadius={"8px"}
            >
            <Image 
              h={"72px"}
              w={"72px"}
              borderRadius={"8px"} 
              source={require('../../../assets/images/chris-liverani-9cd8qOgeNIY-unsplash.jpg')} />

            </Box>
            <VStack>
              <Text fontSize={"16px"} fontWeight={"semibold"}>
                {course.name}
              </Text>
              <Text fontSize={"14px"}>{course.lessons?.length ?? "0"} Lessons</Text>
              <Text color={"gray.500"} fontSize={"14px"}>
                By: Joe Bow 
              </Text>
            </VStack>
          </HStack>
        </HStack>
        </TouchableOpacity>
    )
}