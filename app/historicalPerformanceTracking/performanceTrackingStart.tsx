import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DescriptionSection from '../../components/ui/selfAssessment/descriptionSection';
import { HStack, Button } from 'native-base';
import NextPageButton from '../../components/ui/selfAssessment/nextPageButton';

export default function performanceTrackingStart() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Historical Performance Tracking</Text>
      <DescriptionSection bodyText='Track and celebrate your growth in the "Historical Performance Tracking" section. Visualize your evolution in ASL alphabet proficiency, monitor your advancements, and let your progress fuel your motivation to explore further into the enriching world of ASL.'/>
    <HStack style={styles.nextButton}>
      <NextPageButton text="Start Assessment"  onPress={() => router.push({
    pathname: "/selfAssessment/selfAssessmentStart",
    params: { length: "hello"},
  })} />
    </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFE874',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft:'7%',
    marginTop:'35%',
    marginRight: '40%'
  },
  nextButton: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
});

