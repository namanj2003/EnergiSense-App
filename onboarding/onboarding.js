import React,{useState, useRef} from "react";
import {View, Text, StyleSheet, FlatList, Animated, ImageBackground } from "react-native";
import * as SecureStore from 'expo-secure-store';

import OnboardingItem from "./onboardingItems";
import Paginator from "./pagination";
import NextButton from "./nextButton";
import slides from "./slides";


function Onboarding(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

   const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
    setIsLastPage(viewableItems[0].index === slides.length - 1);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async() => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
    if(isLastPage){
        try {
          await SecureStore.setItemAsync('alreadyLaunched', 'true');
        } catch (error) {
            console.log('error @checkOnboarding: ', error);
        }
    }
  };

    const bg = require("../images/Bg.png");
    return(
        <View style={styles.container} >
            <ImageBackground style={styles.bgIcon} resizeMode="stretch" source={bg}>
            <View style={{flex: 3}}>
            <FlatList
            data={slides}
            renderItem={({item}) => <OnboardingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
                useNativeDriver: false,
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
            />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} slides={slides} isLastPage={isLastPage} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
      },
      bgIcon: {
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative"
    },
})

export default Onboarding;