import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NextPageButtonProps {
  text: string;
  onPress: () => void;
}

const NextPageButton: React.FC<NextPageButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
      <Ionicons name="arrow-forward" size={24} color="black"/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '60%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'space-between', 
    flexDirection: 'row',
    padding: 20,
    margin: '7%',
    marginBottom: '10%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold'
  },
});

export default NextPageButton;
