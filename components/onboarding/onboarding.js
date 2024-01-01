import React, { useState, useRef, useCallback,useEffect } from "react";
import { View, StyleSheet, FlatList, Animated, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingItem from "./onboardingItems";
import Paginator from "./pagination";
import NextButton from "./nextButton";
import slides from "./slides";

function Onboarding() {
  const [isLastPage, setIsLastPage] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [viewableItems, setViewableItems] = useState([]);
  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  async function completeOnboarding() {
    try {
      await AsyncStorage.setItem('alreadyOnboarded', 'true');
      // console.log('Set alreadyOnboarded to true');
    } catch (error) {
      console.error('Error saving data', error);
    }
  }
  
  async function checkOnboarding() {
    try {
      const value = await AsyncStorage.getItem('alreadyOnboarded');
      // console.log('Checked alreadyOnboarded, value is', value);
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  }

  const scrollTo = async () => {
    // console.log('scrollTo called, viewableItems is', viewableItems);
    if (slidesRef.current && viewableItems.length > 0) {
      // console.log('scrollTo called, current index is', viewableItems[0].index);
      if (viewableItems[0].index < slides.length - 1) {
        slidesRef.current.scrollToIndex({ index: viewableItems[0].index + 1, animated: true });
      }
      else if (viewableItems[0].index === slides.length - 1) {
        // console.log('Calling completeOnboarding');
        try {
          await completeOnboarding();
        } catch (error) {
          console.log('error @completeOnboarding: ', error);
        }
      }
    }
  };

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    // console.log('viewableItems changed, new value is', viewableItems);
    setIsLastPage(viewableItems[0].index === slides.length - 1);
    setViewableItems(viewableItems);
  }, [setIsLastPage, setViewableItems, slides.length]);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const bg = require("../../images/Bg.png");
  return (
    <View style={styles.container} >
      <ImageBackground style={styles.bgIcon} resizeMode="stretch" source={bg}>
        <View style={{ flex: 3 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => <OnboardingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: false,
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton scrollTo={scrollTo} slides={slides} isLastPage={isLastPage} completeOnboarding={completeOnboarding} />
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