import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

// use an ES module import 
import React from 'react';

// MAKE ASSETS HERE 

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />; // make an icon << u can replace props with name and colour 
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          marginBottom: 30,
          width: "90%",
          borderRadius: 20,
          paddingBottom: 10,
          alignSelf: "center",
        },
        tabBarItemStyle: {
          margin: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="lesson"
        options={{
          headerShown: false,
          title: "Courses",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="clipboard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assessment"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-ul" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Custom Courses"
        options={{
          headerShown: false,
          title: "Courses",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs> 
    // ^^ tab menu 
  );
}
