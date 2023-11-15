import { Stack, useNavigation } from "expo-router";
import { Button } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { backNavBtnStyle } from "../../styles/backNavButtonStyle";

export default function Layout() {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <Button {...backNavBtnStyle} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={20} color="black" />
            </Button>
          ),
        }}
      />
    </Stack>
  );
}
