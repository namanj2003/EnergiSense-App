import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet,  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import HomeData from "./homeData";
function Homepage({navigation, route}){
  const [deviceData , setDeviceData] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const api = route?.params?.api;
  console.log(api);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    
    setCurrentIndex(viewableItems[0].index);
    setIsLastPage(viewableItems[0].index === slides.length - 1);
  }).current;

  const handleLogout = async() => {
    try{
    await SecureStore.deleteItemAsync('alreadyLoggedIn');
    navigation.navigate("Login");
  }
  catch(error){
    console.log('error @logout ', error);
  }
  }
  useEffect(() => {
    const fecthDeviceData = async () => {
      try {
        const response = await fetch(`https://blr1.blynk.cloud/external/api/getAll?token=${api}`);
        console.log(`https://blr1.blynk.cloud/external/api/getAll?token=${api}`);
        const data = await response.json();
        setDeviceData(data);
        console.log(data);
      } catch (error) {
        console.log("Unable to get Data From Device : ", error);
      }
    }
    fecthDeviceData();
  }
  , []);

    return(
        <View style={styles.container}>
            <Text style={styles.content}>Homepage</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.button1}>Logout</Text>
            </TouchableOpacity>

            <View style={{flex: 3}}>
            <FlatList
            data={deviceData}
            renderItem={({data}) => <HomeData item={data} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(data) => data.value}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
                useNativeDriver: false,
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
            />
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#17181F",
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    content:{
      fontSize:30,
      color:"white",
    },
    button1:{
      color:"white",
    },
  });
export default Homepage;