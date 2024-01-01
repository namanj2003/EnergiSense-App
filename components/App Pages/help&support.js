import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';
import { navIcon, navIconContainer, navText, topNav } from '../../css/pagecss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParsedText from 'react-native-parsed-text';

const Help = ({ navigation }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const data = async () => {
        deviceID = await AsyncStorage.getItem('api');
    }
    data();
    const questions = [
        { question: 'What is EnergiSense?', answer: 'EnergiSense is a Smart Energy Meter that connects to your Home’s Electrical Panel and provides insight into your Energy Usage. It connects to your home’s Wi-Fi and sends data to the EnergiSense App, which you can access from anywhere.' },
        { question: 'How does EnergiSense work?', answer: 'EnergiSense connects to your IoT-based Smart Energy Meter, the EnergiSense Meter, providing Real-Time and Historical readings of Voltage, Current, Power, and kWh usage directly to the app.' },
        { question: 'What kind of data does EnergiSense display?', answer: 'The App showcases Real-Time and Historical usage data, offering insights into your Electricity consumption on a Daily, Weekly, Monthly, and Three-Month basis.' },
        { question: 'How do I install EnergiSense Meter?', answer: 'EnergiSense Meter is installed by a certified electrician. The EnergiSense Meter is installed in your Home’s electrical panel and connects to your Home’s Wi-Fi.' },
        { question: 'How do I connect EnergiSense to my home’s Wi-Fi?', answer: 'You can connect to the Access Point of your device, the details for which will be provided to you with the device. From there you can select the Wi-Fi you wish to connect to.' },
        { question: 'Can I Change the Wi-Fi Network EnergiSense is connected to?', answer: 'Yes, you can change the Wi-Fi Network EnergiSense is connected to. To do so, you will need to Reset the Device Network and then fllowing the same steps as you did connecting the Wi-Fi the first time.' },
        { question: 'How do I Reset the Device Network?', answer: 'To Reset the Device Network, press and hold the reset button for 5 seconds. The device will then restart and you can connect to the new Wi-Fi Network.' },
        { question: 'How do I connect EnergiSense to the EnergiSense App?', answer: 'Once you have connected your EnergiSense Meter to your Home’s Wi-Fi, you can connect to the EnergiSense App by registering with your Email ID and Name and entering the Device ID of your meter.' },
        { question: 'Can I track my electricity bill using EnergiSense?', answer: 'Absolutely! EnergiSense not only displays kWh usage data but also calculates your estimated bill based on this information, giving you a clearer understanding of your energy costs.' },
        { question: 'How do I manage my profile on EnergiSense?', answer: 'Navigate to the Profile Section within the app where you can easily update your Name, Email, and even upload a Profile Picture from your Camera or Gallery.' },
        { question: 'Is EnergiSense compatible with all types of Smart Energy Meters?', answer: 'The simple answer would be NO. The EnergiSense App is only available for EnergiSense Smart Meter’s' },
        { question: 'Can I use EnergiSense without a Smart Energy Meter?', answer: 'No, EnergiSense is only compatible with EnergiSense Smart Energy Meters.' },
        { question: 'Can I use EnergiSense App without an Internet Connection?', answer: 'No, EnergiSense App requires an Internet Connection to function.' },
        { question: 'Can I use EnergiSense Smart Meter without a Smartphone?', answer: 'Yes, But it has certian limitations. You can only check your live data on the Display of your Smart Meter.' },
        {question: 'What will happen if I change my phone?', answer: 'You can simply login to your new phone with the same credentials and you will be able to access your data.'},
        {question: 'What will happen if I change my Smart Meter?', answer: 'Since each Device ID is binded to your Email and only one Device can be used with one Email ID, you contact us at EnergiSenseApp@gmail.com and we will help you with the process.'},


        { question: '', answer: '' },
    ];

    const handleBack = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <View style={topNav}>
                <Text style={navText}>Help & Support</Text>
                <TouchableOpacity onPress={handleBack} style={[navIconContainer,{alignSelf: "flex-start"}]}>
                    <AntDesign name="arrowleft" size={30} color="#c0c5cb" style={[navIcon,{left: 25}]} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.header}>Frequently Asked Questions</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {questions.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.questionContainer}
                            onPress={() => setSelectedQuestion(index === selectedQuestion ? null : index)}
                        >
                            <Text style={styles.question}>{item.question}</Text>
                            <View style={styles.arrow}>
                                <AntDesign name={index === selectedQuestion ? "up" : "down"} size={24} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        {index === selectedQuestion && (
                            <ParsedText
                                style={styles.answer}
                                parse={[
                                    {
                                        pattern: /EnergiSenseApp@gmail.com/,
                                        style: { color: 'tomato', marginVertical: -3 },
                                        onPress: () => Linking.openURL(`mailto:EnergiSenseApp@gmail.com?subject= User's Device ID - ${deviceID}`)
                                    },
                                    {
                                        pattern: /Profile Section/,
                                        style: { color: 'tomato', marginVertical: -3 },
                                        onPress: () => navigation.navigate('Profile')
                                    },
                                    {
                                        pattern: /Live/,
                                        style: { color: 'tomato', marginVertical: -3 },
                                        onPress: () => navigation.navigate('BottomNav')
                                    },
                                    {
                                        pattern: /Real-Time/,
                                        style: { color: 'tomato', marginVertical: -3 },
                                        onPress: () => navigation.navigate('History')

                                    }
                                ]}>
                                {item.answer}
                            </ParsedText>
                        )}
                    </View>
                ))}
            </ScrollView>
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.contact}>Contact Us</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`mailto:EnergiSenseApp@gmail.com?subject= User's Device ID - ${deviceID}`)}>
                        <Text style={styles.email}>EnergiSenseApp@gmail.com</Text>
                    </TouchableOpacity>

            </View>
        </View>
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
    header: {
        color: '#fff',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 12,
        textAlign: 'center'
    },
    questionContainer: {
        width: '90%',
        paddingHorizontal: 25,
        flexDirection: 'row',
        right: 20,
        paddingVertical: 15,
        marginHorizontal: 5,
    },
    question: {
        fontSize: 20,
        color: '#fff',
    },
    arrow: {
        marginLeft: 'auto',
        marginRight: -75,
    },
    answer: {
        fontSize: 17,
        marginHorizontal: 10,
        color: '#becccc',
        paddingHorizontal: 15,
        paddingVertical: 5,
        // flexShrink: 1,
    },
    contact: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        // marginBottom: 5,
        marginTop: 5,
    },
    email: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
        // marginTop: 5,
        color: "#ffa840",
    },
});

export default Help;
