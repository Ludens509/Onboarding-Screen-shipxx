import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

 const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding')
    } catch (error) {
      console,log('Error @clearOnboarding: ', err)
    }
  }
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={clearOnboarding}>
      <Text>clear Onboarding</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})