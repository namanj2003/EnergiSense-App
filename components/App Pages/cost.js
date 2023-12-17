//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Cost = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>Cost</Text>
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

//make this component available to the app
export default Cost;
