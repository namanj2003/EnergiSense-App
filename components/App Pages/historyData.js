//import liraries
import React, { Component, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navIcon, navIconContainer, navText, topNav } from "../../css/pagecss";
import { FontAwesome5 } from 'react-native-vector-icons';
import ip from '../ip';

const HistoricalData = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const initialLoadingRef = useRef(true);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        setLoading(true);
        console.log("Before Fetch");
        const storedApi = await AsyncStorage.getItem('api');
        const auth = await AsyncStorage.getItem('token');
        const response = await fetch(`https://${ip}/historydata-get?deviceID=${storedApi}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
          },
        });
        console.log("After Fetch");
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = await response.json();
        setDeviceData(data);
        setLoading(false);
      } catch (error) {
        console.log("Error during fetch:", error);
        setLoading(true);
      }
    };
    const intervalId = setInterval(fetchDeviceData, 5 * 60 * 1000);
    fetchDeviceData();
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    console.log("Historical Data:", deviceData);
    const time = new Date().toLocaleTimeString();
    console.log(time);
  }, [deviceData]);

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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#17181F",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default HistoricalData;
