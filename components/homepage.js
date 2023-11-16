import React from "react";
import { Text, View } from "react-native";
import { StyleSheet, AppRegistry } from "react-native";
function Homepage(){
    return(
        <View style={styles.container}>
            <Text>Homepage</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    content:{
      fontSize:30,
    }
  });
export default Homepage;