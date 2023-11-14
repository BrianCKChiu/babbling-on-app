import { View } from "native-base";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";
import { HomeCarousel } from "../../components/ui/carousel/home";
import { FeaturedCourses } from "../../components/ui/course/featured";

export default function HomeScreen() {
  return (
    <DefaultLayout>
      <View>
        <HomeCarousel />
        <FeaturedCourses />
      </View>
    </DefaultLayout>
  );
}
