import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface CustomButtonProps {
  text: string;
  buttonColor: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, buttonColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: '20%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15, 
    margin:20,
    borderWidth:3,
    borderColor:'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default CustomButton;
