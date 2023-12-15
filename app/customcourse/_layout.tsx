import React from "react";
import { Stack } from "expo-router";
import {TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Box, Text } from "native-base";


export default function CustomCourseLayout() {
  const router = useRouter();

  return (
    <>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
     />

     
     </Stack>

     <TouchableOpacity
      style = {{margin: 10}}
      onPress={() =>
        router.push({
          pathname: "/lesson", 
        })
      }
      >
      <Box
        h={"50px"}
        w={"380px"} // make this flexible later
        borderRadius={"30px"}
        backgroundColor={"#FFE500"}
        padding={"15px"}
      >
        <Text
        fontSize={"16px"}
        fontWeight={"semibold"}
        textAlign={"center"}
        >More Courses</Text>
      </Box>
      </TouchableOpacity>

     </>
  );
}