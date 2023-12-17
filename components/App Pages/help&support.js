import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { topNav } from '../../css/pagecss';

const Help = ({ navigation }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const questions = [
        // {
        //     id: 1,
        //     question: 'How to connect to a device?',
        //     answer: 'To connect to a device, you need to have the device token. You can get the device token by scanning the QR code on the device. After scanning the QR code, you will be redirected to the app and the device will be connected.'
        // },
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' },
    ];

    const handleBack = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <View style={[topNav, { top: 0, justifyContent: "flex-start" }]}>
                <Text style={styles.content}>Help & Support</Text>
                <TouchableOpacity onPress={handleBack} style={styles.back}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.header}>Frequently Asked Questions</Text>
            </View>
            {questions.map((item, index) => (
                <View key={index}>
                    <TouchableOpacity
                        style={styles.questionContainer}
                        onPress={() => setSelectedQuestion(index === selectedQuestion ? null : index)}
                    >
                        <Text style={styles.question}>{item.question}</Text>
                        <View style={styles.arrow}>
                        <AntDesign name={index === selectedQuestion ? "up" : "down"} size={24} color="#fff"/>
                        </View>
                    </TouchableOpacity>
                    {index === selectedQuestion && <Text style={styles.answer}>{item.answer}</Text>}
                </View>
            ))}
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.header}>Contact Us</Text>
                <Text style={styles.answer}>
                    <Text style={{ color: '#ffa840' }}>
                        EnergiSense@gmail.com
                    </Text>
                </Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#17181F",
        alignItems: "center",
        // justifyContent: "center",
    },
    content: {
        marginTop: 39,
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    back: {
        position: "absolute",
        left: 16,
        top: 48,
        flexDirection: "row",
        alignSelf: "flex-start",
        zIndex: 1,
        elevation: 1,
    },
    header:{
        color: '#fff', 
        fontSize: 20,
         marginTop: 20, 
         marginBottom: 10, 
         textAlign: 'center' 
    },
    questionContainer: {
        width: '90%',
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 'auto',
        right: 20,
        paddingVertical: 15,
    },
    question: {
        fontSize: 20,
        color: '#fff',
    },
    arrow: {
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        left: 40,
    },
    answer: {
        fontSize: 15,
        marginHorizontal: 15,
        width: '90%',
        color: '#fff',
    },
});

export default Help;
