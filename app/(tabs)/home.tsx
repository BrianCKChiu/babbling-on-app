import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { Button, Heading, View, Text} from "native-base";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";
import { HomeCarousel } from "../../components/ui/carousel/home";
import { FeaturedCourses } from "../../components/ui/course/featured";

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <View>
        <HomeCarousel />
        <FeaturedCourses />
      </View>
      <Button size="lg" onPress={() => router.push("/historicalPerformanceTracking")} style={buttonStyles.button}>
        <Text style={buttonStyles.buttonText}>Historical Performance Tracking</Text>
      </Button>
    </DefaultLayout>
  );
}

const buttonStyles = StyleSheet.create({
  button: {
    width: 'auto',
    height: '15%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10%',
    marginBottom: 0,
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#FFE874',
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
