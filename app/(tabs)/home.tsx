import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { Button, Heading, View } from "native-base";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";
import { HomeCarousel } from "../../components/ui/carousel/home";

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <View>
        <HomeCarousel />
        <Heading>Featured Courses</Heading>
      </View>
      <Button size="md" onPress={() => router.push("/historicalPerformanceTracking")}> Historical Performance Tracking</Button>
    </DefaultLayout>
  );
}