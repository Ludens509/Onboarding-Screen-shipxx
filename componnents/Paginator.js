import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native'
import React from 'react'

export default  Paginator = ({ data, scrollX }) => {

const {width} = useWindowDimensions();

  return (
    <View style= {{flexDirection:'row', height: 50}}>
      {data.map((_, i) => {
        //create a variable  for the inputRange that will be an array of 3 values
        //i mis pour index(prev dot, current dot,next dot)
        const inputRange =[(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10], //width of the (prev dot, current dot,next dot)
          extrapolate: 'clamp',
        });

        //giving some opacity to the dot
        const opacity =scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3], //opacity of the (prev dot, current dot,next dot)
          extrapolate: 'clamp',
        })

          return (
            <Animated.View 
                style={[
                    styles.dot,
                    {
                      width:dotWidth,
                      opacity,
                    },
                ]}

                key={i.toString()}
            />
          )
      })}
      
    </View>
  );
}



const styles = StyleSheet.create({
  
  dot:{
    height: 10,
    borderRadius: 5,
    backgroundColor: '#493d8a',
    marginHorizontal: 8,
  }
})