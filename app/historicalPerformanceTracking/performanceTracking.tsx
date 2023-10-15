import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Camera, CameraType } from 'expo-camera';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';
import SAHeaderSection from '../../components/ui/selfAssessment/headerSection';

export default function performanceTracking() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SAHeaderSection text="Your Progress" fontSize={32} ></SAHeaderSection>
      <Text style={styles.bodyText}>Highest Score:</Text>
      <Text style={styles.bodyText}>Average Score:</Text>
      <Text style={styles.bodyText}>List of Assessments:</Text>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/home')}
        style={[styles.nextButton,]}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bodyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:'10%',
    marginTop: '10%',
  },
  performGestureButton: {
    width: 'auto',
    borderRadius: 7,
    alignItems: 'center',
    padding: 30,
    paddingVertical:20,
    margin: '10%',
    marginBottom: '10%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
    margin:10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  messageBox: {
    width: '80%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: '10%',
    marginBottom: '10%',
    marginTop: '0%',
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    padding: 30,
    paddingVertical:20,
    margin: '10%',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 'auto',
    backgroundColor: '#FFE874'
  },
});

