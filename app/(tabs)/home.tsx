import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { Heading, View } from "native-base";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";
import { HomeCarousel } from "../../components/ui/carousel/home";

export default function TabOneScreen() {
  const router = useRouter();
  const tempFeaturedCourses = () => {
    const elements = [];
    for (let i = 0; i < 5; i++) {
      elements.push(<Card title={`Course ${i}`} />);
    }
    return elements;
  };

  return (
    <DefaultLayout>
      <View>
        <HomeCarousel />
        <Heading>Featured Courses</Heading>
        <SideCardScroll items={[]} />
      </View>
    </DefaultLayout>
  );
}
