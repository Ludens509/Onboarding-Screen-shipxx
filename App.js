import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './componnents/Onboarding';
import HomeScreen from './componnents/HomeScreen';
import React, {useState, useEffect  } from 'react';

const Loading = () =>{
 return(
    <View>

    <ActivityIndicator size="large"/>
    </View>
 );
}

export default function App() {
const [loading, setLoading]= useState(true);
const [ viewedOnboarding, setVieweddOnboarding] = useState(false);


const checkOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem('@viewedOnboarding')
    if(value !== null) {
      setVieweddOnboarding(true)
    }
  } catch(e) {
    // error reading value
    console.log('Error @checkOnboarding: ', err)
  }finally{
    setLoading(false)
  }
}

  useEffect(() => {
    checkOnboarding();
  }, [])


  return (
    <View style={styles.container}>
      {loading ? <Loading /> :viewedOnboarding ? <HomeScreen /> : <Onboarding /> }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
