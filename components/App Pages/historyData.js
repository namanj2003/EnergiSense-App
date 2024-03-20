import React, { Component, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navIcon, navIconContainer, navText, topNav } from "../../css/pagecss";
import { FontAwesome5 } from 'react-native-vector-icons';
import ip from '../ip';
import MyChart from './graph';
import Paginator from './paginate';
import { loader } from '../../css/loadercss';
import moment from 'moment';

screenWidth = Dimensions.get('window').width;

const HistoricalData = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [filteredData, setFilteredData] = useState({
    v0Data: [],
    v1Data: [],
    v2Data: [],
    v3Data: [],
  });
  const [selectedFilter, setSelectedFilter] = useState('1D');
  const filterOptions = ['1h', '6h', '1D', '1W', '1M', '3M', 'All'];
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const initialLoadingRef = useRef(true);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        if (initialLoadingRef.current) {
          setLoading(true);
        }
        const storedApi = await AsyncStorage.getItem('api');
        const auth = await AsyncStorage.getItem('token');
        const response = await fetch(`https://${ip}/historydata-get?deviceID=${storedApi}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = await response.json();
        setDeviceData(data);
        if (initialLoadingRef.current) {
          initialLoadingRef.current = false;
          setLoading(false);
        }
      } catch (error) {
        console.log("Error during fetch:", error);
        setLoading(true);
      }
    };
    const intervalId = setInterval(fetchDeviceData, 2 * 60 * 1000);
    fetchDeviceData();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // console.log("Historical Data:", deviceData);
    // const time = new Date().toLocaleTimeString();
    // console.log(time);
    // Filter the data when deviceData changes
    filterData(deviceData, selectedFilter);
  }, [deviceData]);

  const separateData = (data) => {
    const v0Data = [];
    const v1Data = [];
    const v2Data = [];
    const v3Data = [];

    data.forEach((item) => {
      const timestamp = item.timeStamp;
      v0Data.push({ value: parseFloat(item.v0), timeStamp: timestamp });
      v1Data.push({ value: parseFloat(item.v1), timeStamp: timestamp });
      v2Data.push({ value: parseFloat(item.v2), timeStamp: timestamp });
      v3Data.push({ value: parseFloat(item.v3), timeStamp: timestamp });
    });

    return { v0Data, v1Data, v2Data, v3Data };
  };

  const filterData = (data, filter) => {
    const currentDate = new Date();
    // console.log('Original Data:', data);
    // console.log('Selected Filter:', filter);

    const filterSeparatedData = (separatedData) => {
      return separatedData.filter((item) => {
        const timestamp = item.timeStamp;
        const itemDate = moment(timestamp, 'MM/DD/YYYY, hh:mm:ss a');
        // const itemDate = new Date(`${item.timeStamp.replace(/,/g, '')} GMT`);
        // console.log('Item Date:', itemDate);


        switch (filter) {
          case '1h':
            return itemDate >= new Date(currentDate.getTime() - 1 * 60 * 60 * 1000);
          case '3h':
            return itemDate >= new Date(currentDate.getTime() - 3 * 60 * 60 * 1000);
          case '6h':
            return itemDate >= new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
          case '1D':
            return itemDate >= new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
          case '1W':
            return itemDate >= new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
          case '1M':
            return itemDate >= new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
          case '3M':
            return itemDate >= new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
          case 'All':
            return true;
          default:
            return true;
        }
      });
    };

    const { v0Data, v1Data, v2Data, v3Data } = separateData(data);
    // console.log('Separated V0 Data:', v0Data); // Log the separated data for each section
    // console.log('Separated V1 Data:', v1Data);
    // console.log('Separated V2 Data:', v2Data);
    // console.log('Separated V3 Data:', v3Data);

    const filteredV0Data = filterSeparatedData(v0Data);
    const filteredV1Data = filterSeparatedData(v1Data);
    const filteredV2Data = filterSeparatedData(v2Data);
    const filteredV3Data = filterSeparatedData(v3Data);

    // console.log('Filtered V0 Data:', filteredV0Data);
    // console.log('Filtered V1 Data:', filteredV1Data);
    // console.log('Filtered V2 Data:', filteredV2Data);
    // console.log('Filtered V3 Data:', filteredV3Data);

    setFilteredData({ v0Data: filteredV0Data, v1Data: filteredV1Data, v2Data: filteredV2Data, v3Data: filteredV3Data });
  };
  // console.log('Filtered Data:', filteredData);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    filterData(deviceData, filter);
  };

  const helpPage = () => {
    navigation.navigate('Help');
  }

  const chartData = [
    {
      data: filterData && filteredData.v0Data ? filteredData.v0Data.map((item) => item.value) : [],
      title: 'Voltage',
      max: 450,
      label: 'V',
    },
    {
      data: filterData && filteredData.v1Data ? filteredData.v1Data.map((item) => item.value) : [],
      title: 'Current',
      max: 30,
      label: 'A'
    },
    {
      data: filterData && filteredData.v2Data ? filteredData.v2Data.map((item) => item.value) : [],
      title: 'Power',
      max: 50,
      label: 'W'
    },
    {
      data: filterData && filteredData.v3Data ? filteredData.v3Data.map((item) => item.value) : [],
      title: 'kWh',
      max: 10,
      label: 'Kwh'
    },
  ];

  return (
    <View style={styles.container}>
      <View style={topNav}>
        <Text style={navText}>EnergiSense</Text>
        <TouchableOpacity onPress={helpPage} style={[navIconContainer, { right: 25 }]}>
          <FontAwesome5 name="question-circle" size={26} color="#c0c5cb" style={navIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.dataContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={loader} />
        ) : (
          <View style={{ flex: 3, textAlign: "center", }}>
            <FlatList
              data={chartData}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
              getItemLayout={(data, index) => ({ length: screenWidth, offset: screenWidth * index, index, })}
              scrollEventThrottle={32}
              ref={slidesRef}
              renderItem={({ item }) => (
                <View>
                  <MyChart
                    style={styles.chart}
                    data={item.data}
                    title={`Historical ${item.title} Data`}
                    title2={item.title}
                    filterOptions={filterOptions}
                    selectedFilter={selectedFilter}
                    max={item.max}
                    label={item.label}
                  />
                </View>
              )}
            />
            <View style={styles.filterContainer}>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterButton,
                    selectedFilter === option && styles.selectedFilter,
                  ]}
                  onPress={() => handleFilterChange(option)}
                >
                  <Text style={styles.filterText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <View style={styles.paginationContainer}> */}
            <Paginator style={styles.pagination} data={chartData} scrollX={scrollX} />
            {/* </View> */}
          </View>
        )}
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#17181F",
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 10,
    marginTop: 0,
    fontWeight: 'bold',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#21222c',
    borderRadius: 8,
    marginHorizontal: 4,
    fontWeight: 'bold',
  },
  selectedFilter: {
    backgroundColor: 'rgb(47, 52, 66)',
    fontWeight: 'bold',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    bottom: 15,
    alignSelf: "center",
  },
  // pagination: {
  //   bottom: 50,
  //   flexDirection: "row",
  //   height: 5,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "100%",
  // },
});

export default HistoricalData;