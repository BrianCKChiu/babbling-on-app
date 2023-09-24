import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();

  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="quiz"
          options={{
            title: "",
            headerTransparent: true,
            headerShown:
              pathname.match(/^\/quiz\/q\/.+/) ||
              pathname.match(/^\/quiz\/results\/*/)
                ? false
                : true,
          }}
        />

        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </NativeBaseProvider>
  );
}
