import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store';
import MyArcProgress from "./gauge";
import Paginator from "./paginate";
import { Dimensions } from 'react-native';
import { loader } from "../../css/loadercss";


const { width: screenWidth } = Dimensions.get('window');

function HistoryData({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [api, setApi] = useState(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
      SecureStore.getItemAsync('api')
      .then(storedApi => {
        if (isMounted) {
          setApi(storedApi);
        }
      })
      .catch(error => console.error('Could not retrieve api:', error));
 
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('alreadyLoggedIn');
      navigation.navigate("Login");
    }
    catch (error) {
      console.log('error @logout ', error);
    }
  }

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await fetch(`https://blr1.blynk.cloud/external/api/getAll?token=${api}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLoading(false);
        setDeviceData([data]);        
        // console.log(data);
      } catch (error) {
        setLoading(true);
        console.log("Unable to get Data From Device : ", error);
      }
    }
    fetchDeviceData();
    const intervalId = setInterval(fetchDeviceData, 5000);
    return () => clearInterval(intervalId);
  }, [api, loading]);

  const flattenedData = deviceData.flatMap(item => [
    { value: item.v0, max: 450, unit: "V", textName: "Voltage" },
    { value: item.v1, max: 30, unit: "A", textName: "Current" },
    { value: item.v2, max: 50, unit: "W", textName: "Power" },
    { value: item.v3, max: 10, unit: "KWh", textName: "KWh" },
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
      <Text style={styles.content}>Historic Data Graph</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.button1}>Logout</Text>
      </TouchableOpacity>
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
    // backgroundColor: "#fff",
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