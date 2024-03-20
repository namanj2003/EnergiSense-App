import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { navIcon, navIconContainer, navText, topNav } from '../../css/pagecss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ParsedText from 'react-native-parsed-text';

const Help = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [deviceID, setDeviceID] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const storedDeviceID = await AsyncStorage.getItem('api');
            setDeviceID(storedDeviceID);
        };
        fetchData();
    }, []);
    const questions = [
        { question: 'What is EnergiSense?', answer: 'EnergiSense is a Smart Energy Meter that connects to your Home’s Electrical Panel and provides insight into your Energy Usage. It connects to your home’s Wi-Fi and sends data to the EnergiSense App, which you can access from anywhere.' },
        { question: 'How does EnergiSense work?', answer: 'EnergiSense connects to your IoT-based Smart Energy Meter, the EnergiSense Meter, providing Real-Time and Historical readings of Voltage, Current, Power, and kWh usage directly to the app.' },
        { question: 'What kind of data does EnergiSense display?', answer: 'The App showcases Real-Time and Historical usage data, offering insights into your Electricity consumption on a Daily, Weekly, Monthly, and Three-Month basis.' },
        { question: 'How do I install EnergiSense Meter?', answer: 'EnergiSense Meter is installed by a certified electrician. The EnergiSense Meter is installed in your Home’s electrical panel and connects to your Home’s Wi-Fi.' },
        { question: 'How do I connect EnergiSense to my home’s Wi-Fi?', answer: 'You can connect to the Access Point of your device, the details for which will be provided to you with the device. From there you can select the Wi-Fi you wish to connect to.' },
        { question: 'Can I Change the Wi-Fi Network EnergiSense is connected to?', answer: 'Yes, you can change the Wi-Fi Network EnergiSense is connected to. To do so, you will need to Reset the Device Network and then fllowing the same steps as you did connecting the Wi-Fi the first time.' },
        { question: 'How do I Reset the Device Network?', answer: 'To Reset the Device Network, press and hold the reset button for 5 seconds. The device will then restart and you can connect to the new Wi-Fi Network.' },
        { question: 'How do I connect EnergiSense to the EnergiSense App?', answer: 'Once you have connected your EnergiSense Meter to your Home’s Wi-Fi, you can connect to the EnergiSense App by registering with your Email ID and Name and entering the Device ID of your meter.' },
        { question: 'Can I track my electricity bill using EnergiSense?', answer: 'Absolutely! EnergiSense not only displays kWh usage data but also calculates your estimated bill based on this information, giving you a clearer understanding of your energy costs. You can access it from the Cost Section' },
        { question: 'How do I manage my profile on EnergiSense?', answer: 'Navigate to the Profile Section within the app where you can easily update your Name, Email, and even upload a Profile Picture from your Camera or Gallery.' },
        { question: 'Is EnergiSense compatible with all types of Smart Energy Meters?', answer: 'The simple answer would be NO. The EnergiSense App is only available for EnergiSense Smart Meter’s' },
        { question: 'Can I use EnergiSense without a Smart Energy Meter?', answer: 'No, EnergiSense is only compatible with EnergiSense Smart Energy Meters.' },
        { question: 'Can I use EnergiSense App without an Internet Connection?', answer: 'No, EnergiSense App requires an Internet Connection to function.' },
        { question: 'Can I use EnergiSense Smart Meter without a Smartphone?', answer: 'Yes, But it has certain limitations. You can only check your live data on the Display of your Smart Meter.' },
        { question: 'What will happen if I change my phone?', answer: 'You can simply login to your new phone with the same credentials and you will be able to access your data.' },
        { question: 'What will happen if I change my Smart Meter?', answer: 'Since each Device ID is binded to your Email and only one Device can be used with one Email ID, you contact us at EnergiSenseApp@gmail.com and we will help you with the process.' },
    ];

    const handleBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Home');
        }
    };

    return (
        <>
            <View style={topNav}>
                <TouchableOpacity onPress={handleBack} style={[navIconContainer,{left:25}]}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" style={navIcon} />
                </TouchableOpacity>
                <Text style={navText}>Help & Support</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    {questions.map((item, index) => (
                        <View key={index} style={styles.questionContainer}>
                            <TouchableOpacity
                                style={styles.questionHeader}
                                onPress={() => setSelectedQuestion(index === selectedQuestion ? null : index)}
                            >
                                <Text style={styles.question}>{item.question}</Text>
                                <Ionicons name={index === selectedQuestion ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
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
                                            pattern: /Profile/,
                                            style: { color: 'tomato', marginVertical: -3 },
                                            onPress: () => navigation.navigate('Profile')
                                        },
                                        {
                                            pattern: /Live/,
                                            style: { color: 'tomato', marginVertical: -3 },
                                            onPress: () => navigation.navigate('Home')
                                        },
                                        {
                                            pattern: /Real-Time/,
                                            style: { color: 'tomato', marginVertical: -3 },
                                            onPress: () => navigation.navigate('Home')

                                        },
                                        {
                                            pattern: /Historical/,
                                            style: { color: 'tomato', marginVertical: -3 },
                                            onPress: () => navigation.navigate('History')
                                        },
                                        {
                                            pattern: /Cost/,
                                            style: { color: 'tomato', marginVertical: -3 },
                                            onPress: () => navigation.navigate('Cost')
                                        }
                                    ]}
                                    renderText={(text) => <Text style={[styles.answerText, { color: 'white' }]}>{text}</Text>}
                                >
                                    {item.answer}
                                </ParsedText>
                            )}
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.contactContainer}>
                    <Text style={styles.contactText}>Contact Us</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`mailto:EnergiSenseApp@gmail.com?subject= User's Device ID - ${deviceID}`)}>
                        <Text style={styles.email}>EnergiSenseApp@gmail.com</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#17181F",
        paddingHorizontal: 20,
    },
    sectionTitle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    questionContainer: {
        marginBottom: 20,
        backgroundColor: 'rgb(32, 33, 46)',
        borderRadius: 10,
        overflow: 'hidden',
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    question: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    answer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: '#c0c5cb',
    },
    answerText: {
        fontSize: 15,
        lineHeight: 22,
    },
    contactContainer: {
        alignItems: 'center',
        margin: 20,
    },
    contactText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        color: '#ffa840',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    topNav: {
        flexDirection: 'row',
        width: "100%",
        height: 74,
        backgroundColor: "#20212e",
        alignItems: 'center',

    },
    navIconContainer: {
        padding: 10,
    },
    navIcon: {
        left: 25,
    },
    navText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default Help;
