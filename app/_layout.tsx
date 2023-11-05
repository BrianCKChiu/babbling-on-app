import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase";
import React from "react";

// ENTRY POINT OF THE APP

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
  // when you call pathname it will give you the current path youre in in the url
  const pathname = usePathname();

  const router = useRouter();
  const [user, isLoading] = useAuthState(auth); // sets up isLoading and user using useAuthState library that manages your logins

  useEffect(() => {
    if (isLoading) return;
    if (
      !(
        pathname.endsWith("/auth/login") || pathname.endsWith("/auth/signUp")
      ) &&
      user == null
    ) {
      router.replace("/auth");
    }
  }, [isLoading, pathname]); // isLoading will change to false because after you get the response you are either
  // successfully logged in or not and then (after isLoading is false) useEffect can run line 62 etc

  return (
    <NativeBaseProvider>
      <Stack initialRouteName="auth">
        <Stack.Screen name="auth" options={{ headerShown: false }} />
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
        <Stack.Screen
          name="selfAssessment"
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="historicalPerformanceTracking"
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="saPractice"
          options={{
            headerShown: pathname.match(/^\/saPractice\/practiceStart$/)
              ? true
              : false,
            title: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="allCourses" options={{ headerShown: false }} />
      </Stack>
    </NativeBaseProvider>
  );
}
