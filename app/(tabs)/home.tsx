import { StyleSheet } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Heading, Text, View } from "native-base";
import { generateUuid62 } from "../../components/utils/uuid";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";
import { HomeCarousel } from "../../components/ui/carousel/home";
import { SideCardScroll } from "../../components/ui/sideCardScroll";
import Card from "../../components/ui/card";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
