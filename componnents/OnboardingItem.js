import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'

const OnboardingItem = ({ item }) => {

  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image,{ width, resizeMode: 'contain'}]}/>

        <View style={{ flex: 0.2} }>
            <Text style={styles.title}> {item.title} </Text>

            <Text style={styles.description}> {item.description} </Text>
        </View>

    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    flex: 0.5,
    justifyContent: 'center',
  }, 
  title:{
    fontWeight: '800',
    fontSize: 28,
    marginBottom:10,
    color: '#45526E',
    textAlign:'center',
  },
  description:{
    fontWeight: '800',
    color: '#FB981E',
    textAlign:'center',
    paddingHorizontal: 64,
  }
})