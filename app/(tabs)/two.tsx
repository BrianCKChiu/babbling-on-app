import React, { useState, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function TabTwoScreen() {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const cameraRef = useRef<Camera | null>(null);
  const storage = getStorage();

  const takeAndUploadPicture = async () => {
    setIsCameraVisible(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      uploadImageToFirebase(photo.uri);
      setIsCameraVisible(false);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    //const uniqueID = uuidv4();
    console.log('trying');

  
    // Create the file metadata
    const metadata = {
      contentType: 'image/webp'
    };
  
    // Create a reference for the file based on its unique ID
    //const storageRef = ref(storage, `images/${uniqueID}.webp`);
    const storageRef = ref(storage, `images/first.webp`);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('User does not have permission to access the object');
            break;
          case 'storage/canceled':
            console.log('User canceled the upload');
            break;
          case 'storage/unknown':
            console.log('Unknown error occurred, inspect error.serverResponse');
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
      }
    );
  };

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <>
          <Camera
            ref={cameraRef}
            style={{ flex: 1 }}
          >
            <Button title="Take Picture" onPress={takePicture} />
          </Camera>
        </>
      ) : (
        <Button title="Open Camera & Upload" onPress={takeAndUploadPicture} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
