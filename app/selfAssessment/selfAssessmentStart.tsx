import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DescriptionSection from '../../components/ui/selfAssessment/descriptionSection';
import { HStack, Button } from 'native-base';
import NextPageButton from '../../components/ui/selfAssessment/nextPageButton';

export default function selfAssessmentStart() {
  const router = useRouter();

  interface RadioButtonProps {
    label: string;
    value: string;
  }
  
  const RadioButtonOptions: RadioButtonProps[] = [
    { label: 'Short', value: "2" },
    { label: 'Normal', value: "5" },
    { label: 'Long', value: "10" },
  ];

  const [selectedValue, setSelectedValue] = useState<RadioButtonProps>(
    RadioButtonOptions[0]
  );

  const handlePress = (option: RadioButtonProps) => {
    setSelectedValue(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
      <Text style={styles.headerText}>Self Assessment</Text>
      <Text style={styles.headerText}>with AI</Text>
      </View>
      <DescriptionSection bodyText='Test your ASL alphabet know-how with our AI-driven Self-Assessment. 
      Engage in dynamic tests, receive immediate feedback, and pinpoint areas for improvement as you navigate
       through your ASL learning journey with confidence and insight.'/>
      <Text style={styles.questionText}>How long should the assessment be?</Text>
      <HStack style={styles.radiocontainer}>
      {RadioButtonOptions.map((option) => (
        <TouchableOpacity
          key={option.label}
          style={[
            styles.button,
            selectedValue.value === option.value && styles.selectedButton,
          ]}
          onPress={() => handlePress(option)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedValue.value === option.value && styles.selectedButtonText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </HStack>
    <HStack style={styles.nextButton}>
      <NextPageButton text="Start Assessment"  onPress={() => router.push({
    pathname: "/selfAssessment/selfAssessmentPage",
    params: { length: selectedValue.value },
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
    marginTop:'2%',
  },
  headerSection: {
    marginTop: '30%',
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: '10%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  radiocontainer: {
    justifyContent: 'space-around',
    padding:'10%',
    paddingTop: '3%',
    paddingBottom: '5%',
  },
  button: {
    margin: 0.5,
    padding: 20,
    borderWidth: 1,
    width:'30%',
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#F7F9A9',
  },
  selectedButtonText: {
    color: '#000',
  },
  nextButton: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
});

