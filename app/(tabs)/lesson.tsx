import { StyleSheet } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, View } from "native-base";
import { generateUuid62 } from "../../components/utils/uuid";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";

export default function TabThreeScreen() {
  const router = useRouter();

  return <DefaultLayout></DefaultLayout>;
}
