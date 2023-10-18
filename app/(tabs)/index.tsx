import { StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, View } from "native-base";
import { generateUuid62 } from "../../components/utils/uuid";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// import React, { useState, useEffect } from "react";


import { useNavigation } from '@react-navigation/native'; // Import useNavigation


// const Tab = createBottomTabNavigator();

// tab navigator
// function TabNavigator(){
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Tab One" component={TabOneScreen} />
//     </Tab.Navigator>
//   );
// }

// navigate to quizzes
function TabOneScreen() { // Removed 'export default'
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          router.push({
            pathname: "/quiz/",
            params: { id: "as" }, // replace with quiz details id
          });
        }}
      >
        <Text>Daily Quiz</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default TabOneScreen; // Export named exports
// export default TabNavigator; // Export default the TabNavigator
