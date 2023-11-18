import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../components/firebase";
import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useUserStore } from "../components/stores/userStore";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

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

  const router = useRouter();
  const [user, isLoading] = useAuthState(auth);
  const { setUserExp } = useUserStore();

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
  }, [isLoading, pathname]);

  // loads user level and creates user doc if not found
  useEffect(() => {
    if (isLoading) return;
    if (user == null) return;

    async function getUserLevel() {
      if (user == null) return;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      // if user isn't found create user doc
      if (!userDoc.exists()) {
        const newUserData = {
          level: 1,
          currentExp: 0,
          levelExp: 100,
        };
        await setDoc(doc(db, "users", user.uid), newUserData);
        setUserExp(newUserData.level, newUserData.currentExp);
      } else {
        const userData: { userLevel: number; currentExp: number } =
          userDoc.data()?.level;
        setUserExp(userData.userLevel, userData.currentExp);
      }
    }

    getUserLevel();
  }, [user]);

  return (
    <NativeBaseProvider>
      <Stack initialRouteName="auth">
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
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
      </Stack>
    </NativeBaseProvider>
  );
}
