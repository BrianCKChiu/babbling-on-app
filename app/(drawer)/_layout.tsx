import React from "react";
import { Box, Heading } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentComponentProps } from "@react-navigation/drawer/lib/typescript/src/types";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const drawerItemProps = {
  drawerActiveBackgroundColor: "#FFF6A7",
  drawerActiveTintColor: "#000000",
  drawerItemStyle: {
    paddingHorizontal: 8,
  },
};
export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="Home"
        screenOptions={{
          drawerItemStyle: {
            paddingHorizontal: 8,
            justifyContent: "flex-start",
            borderRadius: 8,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            ...drawerItemProps,
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="course"
          options={{
            headerShown: false,
            title: "Explore Courses",
            ...drawerItemProps,
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="compass" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="assessment"
          {...drawerItemProps}
          options={{
            headerShown: false,
            title: "Assessment",
            ...drawerItemProps,
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="check-circle" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings" // temporary change to quiz page
          options={{
            headerShown: false,
            ...drawerItemProps,
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile" // temporary change to quiz page
          options={{
            headerShown: false,
            ...drawerItemProps,
            title: "Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>

    // ^^ tab menu
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Box alignItems={"center"} mb={16} mt={4}>
        <Heading>Babbling On</Heading>
      </Box>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
