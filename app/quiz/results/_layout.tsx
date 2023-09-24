import { Stack } from "expo-router";
import { Text } from "native-base";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
