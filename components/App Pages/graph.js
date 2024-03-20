import React, { useState, useMemo } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width * 0.9;

const MyChart = React.memo(function MyChart({ data, title, max, label, title2 }) {
  const [selectedDotIndex, setSelectedDotIndex] = useState(null);
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.dataContainer}>
        {data && data.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              setSelectedDotIndex(null);
            }}
            activeOpacity={1}
          >
            <View style={{marginBottom: 0, paddingBottom: 0}}>
            <LineChart
              data={{
                labels: ["", "", title2, "", ""],
                datasets: [
                  {
                    data
                  }
                ]
              }}
              width={screenWidth}
              height={400}
              fromZero={true}
              yMax={max}
              yAxisSuffix={label}
              yAxisInterval={10}
              withDots={true}
              withShadow={true}
              withVerticalLines={false}
              segments={10}
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
                        backgroundColor: 'rgba(174, 159, 199, 0.7)',
                        padding: 5,
                        borderRadius: 5
                      }}
                    >
                      {data[index]}
                    </Text>
                  );
                }
              }}
              // hidePointsAtIndex={[0,1,3,4]}
              chartConfig={{
                backgroundColor: "rgb(25, 26, 34)",
                backgroundGradientFrom: "rgb(27, 28, 36)",
                backgroundGradientTo: "rgb(47, 52, 66)",
                decimalPlaces: 2,
                propsForLabels: {
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "white"
                },
                propsForVerticalLabels: {
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  padding: 10,
                  marginBottom: 20,

                },
                color: (opacity = 1) => `rgba(174, 159, 199, ${opacity})`,
                // color: (opacity = 1) => `rgba(157, 131, 199, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                // propsForDots: {
                //   r: "6",
                //   strokeWidth: "2",
                //   stroke: "#ffa726"
                // }
              }}
              bezier

              style={{
                paddingHorizontal: 10,
                borderRadius: 16,
                paddingTop: 30,
                marginBottom: 0,
                paddingBottom: 0, 

              }}
            />
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.errorprint}>No data to display</Text>
        )}
      </View>
    </View>
  );
})
const styles = StyleSheet.create({
  text: {
    width: Dimensions.get("window").width,
    textAlign: "center",
    color: "#c0c5cb",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 30,
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0, // Ensure there's no bottom margin
    paddingBottom: 0, 
  },
  errorprint: {
    width: Dimensions.get("window").width,
    paddingVertical: Dimensions.get("window").height / 2.5 - 100,
    alignContent: "center",
    justifyContent: "center",
    color: "#c0c5cb",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",

  },
});
export default MyChart;
