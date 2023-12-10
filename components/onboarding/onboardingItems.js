import React from "react";
import {View,Text,StyleSheet,Image,useWindowDimensions,} from "react-native";

const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <Image source={item.image}
                style={[styles.image, { width, resizeMode: "contain" }]}
            />
            <View style={{ flex: 0.15 }}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: "100%",
        marginTop: 60,
        alignItems: "center",
        justifyContent: "center",
        
    },
    image: {
        flex: 0.1,
        justifyContent: "center",
        marginBottom:15
    },
    title: {
        fontWeight: "600",
        fontSize: 33,
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 50,
        color: "#fff",
        textAlign: "center",
    },
});
export default OnboardingItem;