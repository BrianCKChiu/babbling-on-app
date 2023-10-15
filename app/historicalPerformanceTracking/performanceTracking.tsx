import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../components/firebase';
import SAHeaderSection from '../../components/ui/selfAssessment/headerSection';
import { useRouter } from 'expo-router';
import { ScrollView } from 'native-base';

export default function PerformanceTracking() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [averageScore, setAverageScore] = useState<string | null>(null);
  const [highestScore, setHighestScore] = useState<string | null>(null);
  const [selfAssessments, setSelfAssessments] = useState<any[]>([]);


  const fetchData = async () => {
    try {
      const responseAvgSc = await fetch(`http://localhost:8080/selfAssessment/average-score/${user?.uid}`);
      if (!responseAvgSc.ok) {
        throw new Error('Server Error');
      }
      const dataAvgSc = await responseAvgSc.json();
      setAverageScore((dataAvgSc.averageScore * 100).toFixed(2));

      const responseHighSc = await fetch(`http://localhost:8080/selfAssessment/highest-score/${user?.uid}`);
      if (!responseHighSc.ok) {
        throw new Error('Server Error');
      }
      const dataHighSc = await responseHighSc.json();
      setHighestScore((dataHighSc.highestScore * 100).toFixed(2));

      const responseAssessments = await fetch(`http://localhost:8080/selfAssessment/assessments/all/${user?.uid}`);
      if (!responseAssessments.ok) {
    throw new Error('Server Error');
        }
        const dataAssessments = await responseAssessments.json();
        setSelfAssessments(dataAssessments);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SAHeaderSection text="Your Progress" fontSize={32}></SAHeaderSection>
        <Text style={styles.bodyText}>Highest Score: {highestScore}</Text>
        <Text style={styles.bodyText}>Average Score: {averageScore}</Text>
        <Text style={styles.bodyText}>List of Assessments:</Text>
        <ScrollView style={styles.scrollView}>
          {selfAssessments.map((assessment, index) => (
            <View
              key={index}
              style={[
                styles.assessmentContainer,
                index % 2 === 1 && styles.coloredAssessmentContainer,
              ]}
            >
              <Text style={styles.assessmentText}>
                Date Taken: {new Date(assessment.dateTaken).toLocaleDateString()}
              </Text>
              <Text style={styles.assessmentText}>Score: {assessment.score.toFixed(2)}</Text>
              <Text style={styles.assessmentText}>
                Practice: {assessment.isPractice ? 'Yes' : 'No'}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/home')}
          style={[styles.nextButton]}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bodyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginTop: '7%',
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    width: '80%',
    margin: '10%',
    marginVertical: '5%',
  },
  assessmentContainer: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  coloredAssessmentContainer: {
    backgroundColor: '#F7F9A9',
  },
  assessmentText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    padding: 30,
    paddingVertical: 20,
    margin: '10%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 'auto',
    backgroundColor: '#FFE874',
  },
});