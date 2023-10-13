import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="performanceTrackingStart"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="practiceAlphabetStart"
        options={{
          headerShown: false,
        }}
      />
    </Stack>

  );
}
