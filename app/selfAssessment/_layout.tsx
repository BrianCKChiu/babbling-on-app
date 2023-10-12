import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="selfAssessmentTab"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="selfAssessmentStart"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="practiceStart"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
