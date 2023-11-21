import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DescriptionSection from "../../components/ui/selfAssessment/descriptionSection";
import { HStack } from "native-base";
import NextPageButton from "../../components/ui/selfAssessment/nextPageButton";

export default function performanceTrackingStart() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Historical Performance Tracking</Text>
      <DescriptionSection bodyText='Track and celebrate your growth in the "Historical Performance Tracking" section. Visualize your evolution in ASL alphabet proficiency, monitor your advancements, and let your progress fuel your motivation to explore further into the enriching world of ASL.' />
      <HStack style={styles.nextButton}>
        <NextPageButton
          text="See Progress"
          onPress={() =>
            router.push({
              pathname: "/historicalPerformanceTracking/performanceTracking",
            })
          }
        />
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFE874",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: "7%",
    marginTop: "35%",
    marginRight: "40%",
  },
  nextButton: {
    alignItems: "flex-end",
    marginLeft: "auto",
  },
});
