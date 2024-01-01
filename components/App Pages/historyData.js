import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyArcProgress from "./gauge";
import Paginator from "./paginate";
import { Dimensions } from 'react-native';
import { loader } from "../../css/loadercss";
import ip from "../ip";

const { width: screenWidth } = Dimensions.get('window');

function HistoryData({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const initialLoadingRef = useRef(true);


  useEffect(() => {
    const sendDeviceHistory = async () => {
      const storedApi = await AsyncStorage.getItem('api');
        const response = await fetch(`https://blr1.blynk.cloud/external/api/getAll?token=${storedApi}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        if (!text) {
          console.log('Empty response body');
          return;
        }
        const data = JSON.parse(text);
        setDeviceData([data]);
        const uploadData = {
          v0: parseFloat(data.v0).toFixed(3),
          v1: parseFloat(data.v1).toFixed(3),
          v2: parseFloat(data.v2).toFixed(3),
          v3: parseFloat(data.v3).toFixed(3),
          v4: parseFloat(data.v4).toFixed(3),
          timeStamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
          deviceID: storedApi
          
        };
        // console.log(uploadData);
        fetch(`https://${ip}/historydata-send`, {
            method: "POST",
            headers: {"Content-Type": "application/json",
            },
            body: JSON.stringify(uploadData),
        })
        .then(res => res.json())
        .then(data => {
          if(data.message==="Data saved successfully"){
            console.log(data.message);
          }
          else{
            console.log("Something went wrong!!! Please try again");
          }})
    }
    sendDeviceHistory();
    const intervalId = setInterval(sendDeviceHistory, 60000);
    return () => clearInterval(intervalId);
  }, []); 

  const flattenedData = deviceData.flatMap(item => [
    { value: item.v0, max: 450, unit: "V", textName: "Voltage" },
    { value: item.v1, max: 30, unit: "A", textName: "Current" },
    { value: item.v2, max: 50, unit: "W", textName: "Power" },
    { value: item.v3, max: 10, unit: "kWh", textName: "kWh" },
  ]);
  const renderItem = ({ item }) => {
    const progress = (item.value / item.max) * 100;
    const text = `${parseFloat(item.value).toFixed(3)} ${item.unit}`;
    const text2 = `${item.textName}`;
    return (<View style={styles.dataContainer}>
      <MyArcProgress progress={progress} text={text} text2={text2} max={item.max}/>
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Homepage</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader}/>):(
      <View style={{flex:1}}>
        <FlatList
          data={flattenedData}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
          getItemLayout={(data, index) => ({ length: screenWidth, offset: screenWidth * index, index, })}
          scrollEventThrottle={32}
          ref={slidesRef}
          />
        <Paginator style={styles.pagination} data={flattenedData} scrollX={scrollX} />
      </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17181F",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginTop: 50,
    fontSize: 30,
    color: "white",
  },
  button1: {
    color: "white",
  },
  dataContainer: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  data: {
    // flex: 1,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 30,
    bottom: "45%",
  },
  pagination:{

    // position:"absolute",
    bottom:20,
    flexDirection:"row",
    height:64,
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
  },
  
});
export default HistoryData;