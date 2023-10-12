import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

const HeaderSection: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Your Header Text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFE874',
    height: '40%', 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'flex-start', 
    justifyContent: 'flex-end', 
    paddingLeft: 20, 
    paddingBottom: 10, 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: 'black', 
  },
});

export default HeaderSection;
