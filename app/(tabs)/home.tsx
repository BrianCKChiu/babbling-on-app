import { StyleSheet } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, View } from "native-base";
import { generateUuid62 } from "../../components/utils/uuid";
import React from "react";
import { DefaultLayout } from "../../components/layout/defaultLayout";

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <View>
        <Button
          onPress={() => {
            router.push({
              pathname: "/quiz/",
            });
          }}
        >
          <Text>Daily Quiz</Text>
        </Button>
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
