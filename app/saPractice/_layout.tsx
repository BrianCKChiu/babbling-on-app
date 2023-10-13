import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="practiceStart"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="practiceAlphabetStart"
        options={{ 
          headerShown: true,
          title: "",
          headerTransparent: true,
        }} 
      />
      <Stack.Screen
        name="practicePage"
        options={{
          headerShown: false,
        }}
      />
    </Stack>

  );
}
