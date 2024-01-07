import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyArcProgress from "./gauge";
import Paginator from "./paginate";
import { Dimensions } from 'react-native';
import { loader } from "../../css/loadercss";
import ip from "../ip";
import { navIconContainer, navText, topNav } from "../../css/pagecss";

const { width: screenWidth } = Dimensions.get('window');

function HistoryData({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState({
    v0: { live: [], oneHour: [], sixHours: [], oneDay: [], oneWeek: [], oneMonth: [], threeMonths: [] },
    v1: { live: [], oneHour: [], sixHours: [], oneDay: [], oneWeek: [], oneMonth: [], threeMonths: [] },
    v2: { live: [], oneHour: [], sixHours: [], oneDay: [], oneWeek: [], oneMonth: [], threeMonths: [] },
    v3: { live: [], oneHour: [], sixHours: [], oneDay: [], oneWeek: [], oneMonth: [], threeMonths: [] },
  });

  useEffect(() => {
    const sendDeviceHistory = async () => {
      const storedApi = await AsyncStorage.getItem('api');
      const token = localStorage.getItem('jwt');
      const response = await fetch(`https://${ip}/historydata-get/deviceID=${storedApi}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      const now = moment();
      const timePeriods = ['live', 'oneHour', 'sixHours', 'oneDay', 'oneWeek', 'oneMonth', 'threeMonths'];
      const variables = ['v0', 'v1', 'v2', 'v3'];
      const filters = {
        live: item => moment(item.timeStamp).isSame(now, 'minute'),
        oneHour: item => moment(item.timeStamp).isAfter(now.subtract(1, 'hours')),
        sixHours: item => moment(item.timeStamp).isAfter(now.subtract(6, 'hours')),
        oneDay: item => moment(item.timeStamp).isAfter(now.subtract(1, 'days')),
        oneWeek: item => moment(item.timeStamp).isAfter(now.subtract(1, 'weeks')),
        oneMonth: item => moment(item.timeStamp).isAfter(now.subtract(1, 'months')),
        threeMonths: item => moment(item.timeStamp).isAfter(now.subtract(3, 'months')),
      };

      const filteredData = {};
      for (const variable of variables) {
        filteredData[variable] = {};
        for (const period of timePeriods) {
          filteredData[variable][period] = data.filter(filters[period]).map(item => item[variable]);
        }
      }
      setFilteredData(filteredData);
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
      <MyArcProgress progress={progress} text={text} text2={text2} max={item.max} />
    </View>
    );
  };
  const helpPage = () => {
    navigation.navigate('Help');
  }
  return (
    <View style={styles.container}>
      <View style={topNav}>
        <Text style={navText}>EnergiSense</Text>
        <TouchableOpacity onPress={helpPage} style={[navIconContainer, { alignSelf: "flex-end" }]}>
          {/* <MaterialIcons name="support-agent" size={35} color="#c0c5cb" style={styles.help}/> */}
          <FontAwesome5 name="headset" size={24} color="#c0c5cb" style={[navIcon, { right: 25 }]} />
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
  pagination: {

    // position:"absolute",
    bottom: 20,
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

});
export default HistoryData;