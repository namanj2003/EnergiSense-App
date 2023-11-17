import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet,  } from "react-native";
function Homepage({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.content}>Homepage</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.button1}>Logout</Text>
            </TouchableOpacity>
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