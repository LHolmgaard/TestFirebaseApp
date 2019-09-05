import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import TestComponent from '../../components/AppComponents'

export default function TestScreen() {
    return (
      <View style={styles.container}>
       <Text>Hello</Text>
       <TestComponent/>
      </View>
    );
  }
  
  
  
  const styles = StyleSheet.create({
  
  });
  