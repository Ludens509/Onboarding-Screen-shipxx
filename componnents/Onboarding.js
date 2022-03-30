import { StyleSheet, View, Text, FlatList, Animated } from 'react-native'
import React, { useState, useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import slides from '../slides'
import NextButton from './NextButton'


const Onboarding = () => {
// state to viewed the current index
//beacause we're going to get the index of whatever slides on the screen
const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX =useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);// reference for the flatList it self

//use Ref to show when ever the flatlist scroll and move on the next one
//and say the state of the current slide display on screen
  const viewableItemsChanged = useRef(({ viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

 //say next slide should be a 50% of the screen before change
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

//for moving the slides forward
  const scrollTo = async () =>{
    if(currentIndex < slides.length -1){
      slidesRef.current.scrollToIndex({index: currentIndex +1})
    }else{
      try {
        await AsyncStorage.setItem('@viewedOnboarding','true');
      } catch (error) {
        console.log('Error @setItem:', err);
      }
    }

  }

  return (
    <View style={styles.container}>
      {/* taking 3 times is much space as the other items of the screen */}
        <View style ={{flex: 1}}>   
            <FlatList data={slides}
                renderItem={({ item }) => <OnboardingItem item={item} /> } 
                horizontal

                showsHorizontalScrollIndicator={false}

                pagingEnabled

                bounces={false}

                keyExtractor ={(item) => item.id}

                onScroll ={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                  useNativeDriver:false, //because we will animated {width}, the nativeDriver did not support width
                })}

                scollEventThrottle={32}

                onViewableItemsChanged={ viewableItemsChanged } //use as a Prop

                viewabilityConfig = { viewConfig } // use as a Prop

                ref={slidesRef} //reference for the flatlist
              />

              
        </View>
      
           <Paginator data={slides} scrollX={scrollX} />
           <NextButton  scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />{/*pourcentage du flatlist*/}

    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})