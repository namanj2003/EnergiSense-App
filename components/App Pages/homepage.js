import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store';
import MyArcProgress from "./gauge";
import Paginator from "./paginate";
import { MaterialIcons, FontAwesome5  } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { loader } from "../../css/loadercss";
import { topNav } from "../../css/pagecss";

const { width: screenWidth } = Dimensions.get('window');

function Homepage({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const initialLoadingRef = useRef(true);

  const helpPage = () => {
    navigation.navigate('Help');
  }

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        if (initialLoadingRef.current) {
          setLoading(true);
        }
        const storedApi = await SecureStore.getItemAsync('api');
        const response = await fetch(`https://blr1.blynk.cloud/external/api/getAll?token=${storedApi}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDeviceData([data]);
        // console.log(data);
        if (initialLoadingRef.current) {
          initialLoadingRef.current = false;
          setLoading(false);
        }
      } catch (error) {
        // console.log("Unable to get Data From Device : ", error);
      }
    }
    fetchDeviceData();
    const intervalId = setInterval(fetchDeviceData, 5000);
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
      <MyArcProgress progress={progress} text={text} text2={text2} max={item.max} />
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={topNav}>
        <Text style={styles.content}>EnergiSense</Text>
        <TouchableOpacity onPress={helpPage} style={styles.helpContainer}>
          {/* <MaterialIcons name="support-agent" size={35} color="#c0c5cb" style={styles.help}/> */}
          <FontAwesome5 name="headset" size={24} color="#c0c5cb" style={styles.help}/>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader} />) : (
        <View style={{ flex: 1 }}>
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
          <View style={styles.paginationContainer}>
          <Paginator style={styles.pagination} data={flattenedData} scrollX={scrollX} />
          </View>
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
  helpContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    zIndex: 1,
    elevation: 1,
    position: "absolute",
  },
  help: {
    position: "absolute",
    right: 25,
  },
  content: {
    marginTop: 39,
    fontSize: 30,
    color: "#ffa840",
    fontWeight: "bold",
    textAlign: "center",
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
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 30,
    bottom: "45%",
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
  },
  pagination: {
    bottom: 50,
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

});
export default Homepage;