import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { topNav, navText, navIcon, navIconContainer } from "../../css/pagecss"
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../ip";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import { LineChart } from "react-native-chart-kit";

const Cost = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    OpenSans: OpenSans_400Regular,
  });
  
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const [kwh, setKwh] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [last3MonthsComparison, setLast3MonthsComparison] = useState([]);
  const [selectedDotIndex, setSelectedDotIndex] = useState(null);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        setLoading(true);
        const storedApi = await AsyncStorage.getItem("api");
        const auth = await AsyncStorage.getItem("token");
        const response = await fetch(`https://${ip}/historydata-get?deviceID=${storedApi}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = await response.json();
        setKwh(data);
        const months = new Set(data.map((item) => moment(item.timeStamp, "MM/DD/YYYY, hh:mm:ss a").month() + 1));
        const years = new Set(data.map((item) => moment(item.timeStamp, "MM/DD/YYYY, hh:mm:ss a").year()));
        setUniqueMonths(Array.from(months).sort((a, b) => a - b));
        setUniqueYears(Array.from(years).sort((a, b) => a - b));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error during fetch:", error);
      }
    };
    const intervalId = setInterval(fetchDeviceData, 1 * 60 * 1000);
    fetchDeviceData();
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    filterData(kwh, selectedMonth, selectedYear);
  }, [kwh, selectedMonth, selectedYear]);

  const filterData = (data, month, year) => {
    const currentDate = moment();
    const startOfMonth = moment().utc().startOf("month").toDate();
    const filteredData = data.filter((item) => {
      const timestamp = moment(item.timeStamp, "MM/DD/YYYY, hh:mm:ss a");
      if (month && year) {
        return timestamp.month() + 1 === month && timestamp.year() === year;
      } else {
        return timestamp.isSameOrAfter(startOfMonth, "day") && timestamp.isSameOrBefore(currentDate, "day");
      }
    });
    setFilteredData(filteredData);
  };

  const calculateCost = (filteredData) => {
    if (filteredData.length === 0) {
      return "No Data Available";
    }
    const totalKwh = filteredData.reduce((sum, item) => {
      return sum + parseFloat(item.v3);
    }, 0);
    let fixedCharge;
    let energyCharge;
    if (totalKwh <= 100) {
      fixedCharge = 85;
      energyCharge = 1.95 * totalKwh;
    } else if (totalKwh <= 300) {
      fixedCharge = 125;
      energyCharge = 5.3 * totalKwh;
    } else if (totalKwh <= 500) {
      fixedCharge = 125;
      energyCharge = 8.89 * totalKwh;
    } else {
      fixedCharge = 125;
      energyCharge = 10.86 * totalKwh;
    }
    let wheelingCharge = 1.74 * totalKwh;
    let electricityDuty = 0.16 * (fixedCharge + energyCharge + wheelingCharge);
    let mTax = (26.04 / 100) * totalKwh;
    let cost = fixedCharge + energyCharge + wheelingCharge + electricityDuty + mTax;
    return cost.toFixed(2);
  };

  const totalCost = calculateCost(filteredData);
  let costText;
  if (selectedMonth && selectedYear) {
    const monthName = moment().month(selectedMonth - 1).format("MMMM");
    costText = `Cost for ${monthName} ${selectedYear}`;
  } else {
    costText = "Cost for Current Month";
  }

  const calculateTotalCostForMonth = (data, month, year) => {
    if (!month || !year) {
      const currentDate = moment();
      month = currentDate.month() + 1;
      year = currentDate.year();
    }

    const filteredData = data.filter((item) => {
      const timestamp = moment(item.timeStamp, "MM/DD/YYYY, hh:mm:ss a");
      return timestamp.month() + 1 === month && timestamp.year() === year;
    });

    const totalCost = calculateCost(filteredData);

    return totalCost;
  };

  useEffect(() => {
    const calculateCostForLast3Months = async () => {
      const currentMonthCost = calculateTotalCostForMonth(kwh);

      const currentDate = moment();
      const lastMonth = currentDate.clone().subtract(1, "month").month() + 1;
      const lastMonthYear = currentDate.clone().subtract(1, "month").year();
      const lastMonthCost = await calculateTotalCostForMonth(kwh, lastMonth, lastMonthYear);

      const twoMonthsAgo = currentDate.clone().subtract(2, "months").month() + 1;
      const twoMonthsAgoYear = currentDate.clone().subtract(2, "months").year();
      const twoMonthsAgoCost = await calculateTotalCostForMonth(kwh, twoMonthsAgo, twoMonthsAgoYear);

      setLast3MonthsComparison([
        { month: lastMonth, year: lastMonthYear, totalCost: lastMonthCost },
        { month: twoMonthsAgo, year: twoMonthsAgoYear, totalCost: twoMonthsAgoCost },
        { month: currentDate.month() + 1, year: currentDate.year(), totalCost: currentMonthCost },
      ]);
    };

    calculateCostForLast3Months();
  }, [kwh]);
//
  const helpPage = () => {
    navigation.navigate("Help");
  };
//
  return (
    <>
      <View style={topNav}>
        <Text style={[navText,{fontFamily: 'OpenSans'}]}>EnergiSense</Text>
        <TouchableOpacity onPress={helpPage} style={[navIconContainer, { right: 25 }]}>
          <FontAwesome5 name="question-circle" size={24} color="#c0c5cb" style={navIcon} />
        </TouchableOpacity>
      </View >
      <View style={styles.container}>
        <Text style={styles.heading}>Cost</Text>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(value) => setSelectedMonth(value)}
              style={[styles.picker, { width: 160 }]}
              dropdownIconColor={"white"}
              mode={'dropdown'}
            >
              <Picker.Item label="Select Month" value={null} style={styles.pickerItem} />
              {uniqueMonths.map((month) => (
                <Picker.Item key={month} label={moment().month(month - 1).format("MMMM")} value={month} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
              style={[styles.picker, { width: 160 }]}
              dropdownIconColor={"white"}
              mode={'dropdown'}
            >
              <Picker.Item label="Select Year" value={null} style={styles.pickerItem} />
              {uniqueYears.map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
        </View>
        <Text style={styles.costText}>{costText}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.activityIndicator} />
        ) : (
          <Text style={styles.cost}>₹{totalCost}</Text>
        )}
        {showGraph && (
          <TouchableOpacity
            onPress={() => {
              setSelectedDotIndex(null);
            }}
            activeOpacity={1}
          >
            <View style={styles.graphContainer}>
              <LineChart
                data={{
                  labels: last3MonthsComparison
                    .sort((a, b) => uniqueMonths.indexOf(a.month) - uniqueMonths.indexOf(b.month))
                    .map((monthData) => `${moment().month(monthData.month - 1).format("MMMM")} ${monthData.year}`),
                  datasets: [
                    {
                      data: last3MonthsComparison.map((monthData) => parseFloat(monthData.totalCost) || 0),
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 40}
                height={300}
                yAxisLabel="₹"
                fromZero={true}
                segments={5}
                withVerticalLines={false}
                onDataPointClick={({ index }) => {
                  setSelectedDotIndex(index);
                }}
                renderDotContent={({ x, y, index }) => {
                  if (index === selectedDotIndex) {
                    return (
                      <Text
                        key={index}
                        style={{
                          position: "absolute",
                          left: x - 35,
                          top: y - 35,
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 12,
                          backgroundColor: 'rgba(255, 128, 0, 1)',
                          padding: 5,
                          borderRadius: 5
                        }}
                      >
                        ₹{last3MonthsComparison[index].totalCost}
                      </Text>
                    );
                  }
                }}
                chartConfig={{
                  backgroundColor: "rgb(27, 28, 36)",
                  backgroundGradientFrom: "rgb(27, 28, 36)",
                  backgroundGradientTo: "rgb(47, 52, 66)",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(174, 159, 199, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                  propsForLabels: {
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "white",
                    paddingHorizontal: 10,
                  },
                }}
                bezier
                style={{
                  borderRadius: 16,
                  paddingTop: screenWidth * 0.07,
                }}
              />

            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.visualizeButton} onPress={() => setShowGraph(!showGraph)}>
          <Text style={styles.visualizeButtonText}>{showGraph ? 'Hide Comparision' : 'Visualize and Compare'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const { width: screenWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17181F",
    padding: screenWidth * 0.05,
    position: 'relative',
  },
  heading: {
    fontSize: screenWidth * 0.07,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: screenWidth * 0.03,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: screenWidth * 0.03,
  },
  pickerWrapper: {
    borderRadius: 100,
    width: screenWidth * 0.425,
    backgroundColor: "rgb(32, 33, 46)",
    overflow: "hidden",
  },
  picker: {
    color: "white",
    marginHorizontal: 10,
  },
  pickerItem: {
    color: "white",
    textAlign: "center",
    width: "100%",
    backgroundColor: "rgb(32, 33, 46)",
    borderRadius: 100,
  },
  costText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cost: {
    textAlign: "center",
    paddingVertical: screenWidth * 0.02,
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  activityIndicator: {
    paddingVertical: screenWidth * 0.02,
    alignItems: "center",
    color: 'rgb(32, 33, 46)'
  },
  visualizeButton: {
    backgroundColor: "#3498db",
    paddingVertical: screenWidth * 0.03,
    borderRadius: 100,
    alignSelf: "center",
    bottom: screenWidth * 0.03,
    position: "absolute",
    width: "100%",
    textAlign: "center",
    zIndex: 1,
  },
  visualizeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  graphContainer: {
    // marginTop: screenWidth * 0.01,
  },
  graphHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: screenWidth * 0.02,
  },
});
export default Cost;