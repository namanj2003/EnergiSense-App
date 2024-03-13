import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cost = () => {
  const [kwh, setkWh] = useState(0);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const storedApi = await AsyncStorage.getItem('api');
        const response = await fetch(`https://blr1.blynk.cloud/external/api/getAll?token=${storedApi}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const kwhData = parseFloat(data.v3).toFixed(3);
        setkWh(kwhData);
      } catch (error) {
        console.log("Unable to get Data From Device : ", error);
      }
    }
    fetchDeviceData();
    const intervalId = setInterval(fetchDeviceData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  let fixedCharge;
  let energyCharge;

  if (kwh == 0) {
    fixedCharge = 0;
    energyCharge = 0;
  } else if (kwh <= 100) {
    fixedCharge = 85;
    energyCharge = 1.95 * kwh;
  } else if (kwh <= 300) {
    fixedCharge = 125;
    energyCharge = 5.30 * kwh;
  } else if (kwh <= 500) {
    fixedCharge = 125;
    energyCharge = 8.89 * kwh;
  } else {
    fixedCharge = 125;
    energyCharge = 10.86 * kwh;
  }
  // console.log(kwh)
  let wheelingCharge = 1.74 * kwh;
  let electricityDuty = 0.16 * (fixedCharge + energyCharge + wheelingCharge);
  let mTax = (26.04 / 100) * kwh;
  let cost = (fixedCharge + energyCharge + wheelingCharge + electricityDuty + mTax);
  console.log(cost)
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Cost</Text>
      <Text style={styles.content}>{cost.toFixed(2)}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17181F',
  },
  content: {
    marginTop: 50,
    fontSize: 30,
    color: 'white',
  },
});

export default Cost;