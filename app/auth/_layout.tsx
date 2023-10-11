import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
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
        }}
      />
    </Stack>
  );
}
