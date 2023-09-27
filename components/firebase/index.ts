// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqt1Yri0-e9XuzmYlwe7HHU9B3HLcVZVI",
  authDomain: "babbling-on-2023.firebaseapp.com",
  projectId: "babbling-on-2023",
  storageBucket: "babbling-on-2023.appspot.com",
  messagingSenderId: "191705213962",
  appId: "1:191705213962:web:656ad8754236dd1c4843f3",
  measurementId: "G-GY8HKDMZ21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage();

export async function getFile(path: string): Promise<string> {
  const mediaRef = ref(storage, `gs://babbling-on-2023.appspot.com/${path}`);
  return await getDownloadURL(mediaRef);
}
