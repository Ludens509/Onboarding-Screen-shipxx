
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useRef} from 'react'
import Svg, {G, Circle} from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';



const NextButton = ({ percentage, scrollTo}) => {

  const size =120;

  const strokeWidth = 2;

  const center = size / 2;

  const radius = size / 2 - strokeWidth /2;

  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;

  const progressRef = useRef(null);
 
  const animation = (toValue) => {
    return Animated.timing(progressAnimation,{
      toValue,
      duration: 250,
      useNativeDriver:true,
    }).start();
  };
    //return an animated function that use the progressAnimation
  

    useEffect(() => {
      animation(percentage);
    }, [percentage]);

    useEffect(() => {
      progressAnimation.addListener(
          (value) => {
            const strokeDashoffset = circumference -(circumference * value.value) /100;

            if (progressRef?.current) {

              progressRef.current.setNativeProps({
                strokeDashoffset,
              })

            }
          }, 
          [percentage]
      );
          //to remove all the listener where component unmount
      return () =>{
        progressAnimation.removeAllListeners()
      };

    }, []);

  return (
    <View style ={styles.container}>
      <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
              <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />

              <Circle
                  ref={progressRef}
                  stroke="#45526E" //thin circle
                  cx={center} 
                  cy={center} 
                  r={radius} 
                  strokeWidth={strokeWidth} 
                  strokeDasharray={circumference}
                  // strokeDashoffset={circumference -(circumference * 60) /100} //taking the pourcentage of the progress
              />
          </G>
      </Svg>

      <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>

    </View>
  )
}

export default NextButton

const styles = StyleSheet.create({
  container:{
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    position: 'absolute',
    backgroundColor: '#FFA133',
    borderRadius: 100,
    padding: 20,
  },
})