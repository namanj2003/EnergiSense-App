import React from "react";
import {ImageBackground,StyleSheet,View,Text,Pressable,Image, Dimensions, Button, TouchableOpacity} from "react-native";
function Onboarding1 ({navigation}){
  const bg = require("../images/Bg.png");
  const icon = require("../images/Icon.png");
  const navigate = () => {
    navigation.navigate('Onboarding2'); // Use navigation.navigate
  }
//   const fetchFonts = async() => {
//     await Font.loadAsync({
//       "Poppins-SemiBold": require("./fonts/Poppins-SemiBold.ttf"),
//     });
//   };
    // const [dataLoaded, setDataLoaded] = useState(false);
  
    // if (!dataLoaded) {
    //   return (
    //     <AppLoading
    //       startAsync={fetchFonts}
    //       onFinish={() => setDataLoaded(true)}
    //       onError={(err) => console.log(err)}
    //     />
    //   );
    // }
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgIcon} resizeMode="stretch" source={bg}>
      <View style={styles.content}>
          <Image style={styles.icon} resizeMode="cover" source={icon} />
          <Text style={styles.title}>Welcome to EnergiSense</Text>
        </View>
        <View style={styles.pagination}>
            <View style={styles.object1} />
            <View style={[styles.object2, styles.objectLayout]} />
            <View style={[styles.object3, styles.objectLayout]} />
            
        </View>
        <View style={styles.button1}>
          <Button title="Next" style={styles.button2} onPress={navigate} color={"#326370"} shadowColor={"rgba(50, 99, 112, 0.5)"}
          shadowOffset= {["width= 0","height= height * 0.04"]} shadowRadius= {"width * 0.03"} elevation= {"width * 0.03"} shadowOpacity= {1} borderRadius={"50%"}>
          {/* <Text style={styles.label}>Next</Text> */}
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    //Container
container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
},
//Background
bgIcon: {
    flex: 1,
    width: "100%",
    height: height,
    overflow: "hidden",
    position: "relative"
},
//Content
icon: {
    top: 0,
    left: width * 0.1695,
    width: width * 0.2,
    height: height * 0.1,
    overflow: "hidden",
    position: "absolute"
    },
title: {
    top: height * 0.125,
    left: 0,
    fontSize: width * 0.06,
    lineHeight: height * 0.04,
    fontWeight: "600",
    // fontFamily: "Poppins-SemiBold",
    color: "#fff",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.5455,
    height: height * 0.2,
    position: "absolute"
},
content: {
    flex: 1,
    width: "100%",
    height: height * 0.3,
    top: "45%",
    left: "50%",
    marginLeft: "-27%",
    marginTop: "-27%",
    position: "absolute"
},
//Pagination
objectLayout: {
    opacity: 0.4,
    width: width * 0.02,
    backgroundColor: "#5d5e68",
    transform: [{rotate: "180deg"}],
    borderRadius: width * 0.01,
    top: height * 0.6,
    position: "absolute",
    height: height * 0.01
},
object1: {
    left: width * 0.1,
    backgroundColor: "#1295b8",
    width: width * 0.08,
    transform: [{rotate: "180deg"}],
    borderRadius: width * 0.5,
    top: height * 0.6,
    position: "absolute",
    height: height * 0.01,
    // padding:"5px",
},
object2: {
    left: width * 0.2
},
object3: {
    left: width * 0.24
},
pagination: {
    lex: 1,
    width: "100%",
    height: height * 0.01,
    top: height * 0.15,
    left: width * 0.585,
    marginLeft: "-27%",
    marginTop: "-27%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
},
//Button
button2: {
    borderRadius: 50,
    shadowColor: "rgba(50, 99, 112, 0.5)",
    shadowOffset: {width: 0,height: height * 0.04},
    shadowRadius: width * 0.03,
    elevation: width * 0.03,
    shadowOpacity: 1,
    width: "100%",
    overflow: "hidden",
    position: "absolute"
},
button1: {
    width: "60%",
    borderRadius: "100%",
    top: height * 0.8,
    left: "40%",
    marginLeft: "-20%",
    marginTop: "-27%",
}
// label: {
//     top: height * 0.02,
//     left: width * 0.4,
//     fontSize: width * 0.04,
//     lineHeight: height * 0.03,
//     fontWeight: "600",
//     fontFamily: "Poppins-SemiBold",
//     color: "#fff",
//     textAlign: "left",
//     position: "absolute"
// },

});

export default Onboarding1;