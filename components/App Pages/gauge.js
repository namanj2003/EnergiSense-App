import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const dotArc = require('../../images/Oval.png');
const MyArcProgress = React.memo(({ progress, text, text2, max }) => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems:"center"}}>
      <Text style={styles.minValue}>0</Text>
      <AnimatedCircularProgress
      style={{marginHorizontal:10}}
        size={250}
        width={35}
        fill={progress}
        rotation={-120}
        arcSweepAngle={240}
        lineCap="round"
        tintColor="#7b32c9"
        backgroundColor="#FED0A3"
        >        
        {() => (
          <>
          <ImageBackground source={dotArc} style={{width: 160, height: 160, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.circle}>
            <Text style={styles.Text1}>{text}</Text>
            <Text style={styles.Text2}>{text2}</Text>
            </View>
            </ImageBackground>
            </>
          )
        }
      </AnimatedCircularProgress>
      <Text style={styles.maxValue}>{max}</Text>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  minValue: {
    position: 'absolute',
    left: -5,
    bottom: '20%',
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    // Adjust these values as necessary...
  },
  maxValue: {
    position: 'absolute',
    right: -25,
    bottom: '20%',
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    // Adjust these values as necessary...
  },
  circle: {
    width: 130, // Adjust as necessary
    height: 130, // Adjust as necessary
    borderRadius: 65, // Half of width and height
    backgroundColor: '#f7dcd9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text1: {
    fontSize: 25,
    color: "#343337",
    fontWeight: "bold",
    textAlign: "center",
  },
  Text2: {
    fontSize: 23,
    color: "#343337",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default MyArcProgress;
