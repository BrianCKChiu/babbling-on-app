import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DescriptionSection from '../../components/ui/selfAssessment/descriptionSection';
import { HStack, VStack, Button, ScrollView } from 'native-base';
import NextPageButton from '../../components/ui/selfAssessment/nextPageButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../components/firebase';

export default function practiceAlphabetStart() {
  const router = useRouter();
  const { option } = useLocalSearchParams();
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [selectedLetter, setSelectedLetter] = useState(alphabet[0]);
  const [user] = useAuthState(auth);

  const handlePress = (letter: React.SetStateAction<string>) => {
    setSelectedLetter(letter);
    console.log(`Selected: ${letter}`);
  };
const startPractice =()=>{
  fetch("http://localhost:8080/selfAssessment/start-assessment", {
  method: "POST",
  body: JSON.stringify({
    userId: user?.uid, 
    isPractice: true,
  }),
  headers: {
    "Content-Type": "application/json",
  },
})
.then((response) => {
  if (!response.ok) {
    return Promise.reject('Server Error');
  }
  router.push({
    pathname: "/saPractice/practicePage",
    params: { letter: selectedLetter},
  });
})
.then((data) => {
  console.log("Practice Started:", data);
})
.catch((err) => {
  console.error("Error:", err);
});
};

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
      <Text style={styles.headerText}>Practice ASL</Text>
      <Text style={styles.headerText}>Alphabets</Text>
      </View>
      <DescriptionSection bodyText='Dive into the Practice ASL Alphabets section for focused and structured
       practice sessions. Explore and refine your fingerspelling skills through hands-on exercises 
       and interactive visuals, crafted to enhance your mastery over the ASL alphabet seamlessly. 
       Choose an Alphabet to start practice!'/>
       <Text style={styles.questionText}>Which Alphabet would you like to practice?</Text>
       <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {alphabet.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={[
              styles.button,
              selectedLetter === letter && styles.selectedButton,
            ]}
            onPress={() => handlePress(letter)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedLetter === letter && styles.selectedButtonText,
              ]}
            >
              {letter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    <HStack style={styles.nextButton}>
      <NextPageButton text="Start Practice"  onPress={() => startPractice()} />
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
  headerSection: {
    marginTop: '30%',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft:'7%',
    marginTop: '2%',
  },
  nextButton: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: '10%',
  },
  scrollView: {
    maxHeight: 120,
    width: '80%',
    marginLeft: '10%',
  },
  scrollContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    margin: 5, 
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#F7F9A9',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#000',
  },
});

