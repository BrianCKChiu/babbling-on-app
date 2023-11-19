import { HStack, Heading, VStack, View } from "native-base";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";
import { HomeCarousel } from "../../components/ui/carousel/home";
import { FeaturedCourses } from "../../components/ui/course/featured";

export default function HomeScreen() {
  return (
    <DefaultLayout>
      <View>
        <HomeCarousel />
        <VStack display={"flex"} space={"12px"} mb={"16px"}>
          <Heading>Continue your Learning</Heading>
          <VStack display={"flex"} space={"8px"}>
            {[1, 2, 3].map((_, index) => {
              return (
                <HStack
                  key={index}
                  w={"full"}
                  h={"60px"}
                  bgColor={"amber.300"}
                  borderRadius={"8px"}
                ></HStack>
              );
            })}
          </VStack>
        </VStack>
        <FeaturedCourses />
      </View>
    </DefaultLayout>
  );
}
