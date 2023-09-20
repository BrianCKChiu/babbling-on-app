import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useRouter } from "expo-router";
import { Button } from "@gluestack-ui/themed";

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          router.push("/quiz");
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
