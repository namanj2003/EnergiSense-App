import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeData = ({data}) => {
    return (
        <View style={styles.container}>
<Text style={styles.content}>{data.value}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    content: {
        fontSize: 30,
        color: 'white',
    },
});


export default HomeData;
