import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ActivityIndicator } from 'react-native';
import { navIcon, navIconContainer, navText, topNav } from '../../css/pagecss';
import { Ionicons } from 'react-native-vector-icons';
import { content, error1, input, inputContainer } from '../../css/logincss';
import { button1, buttonContainer } from '../../css/buttoncss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ip from '../ip';
import { loader } from '../../css/loadercss';

const ChangePassword = ({ navigation }) => {
    const [userData, setUserData] = useState({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
    const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
    const [secureTextEntryConfPass, setSecureTextEntryConfPass] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('email');
                if (storedEmail) {
                    setUserData({ ...userData, email: storedEmail });
                }
            } catch (error) {
                console.log('error @changePassword ', error);
            }
        };
        getData();
    }, []);

    const handleBack = () => {
        navigation.goBack();
    }

    const toggleSecureTextEntryPass = () => {
        setSecureTextEntryPass(!secureTextEntryPass);
    };
    const toggleSecureTextEntryConfPass = () => {
        setSecureTextEntryConfPass(!secureTextEntryConfPass);
    };

    function validatePassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
      }

    const handlePassChange = () => {
        if (userData.currentPassword === "" || userData.newPassword === "" || userData.confirmPassword === "") {
            setErrorMsg("All fields are required");
            return;
        }
        else if (userData.newPassword !== userData.confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }
        else if (userData.newPassword.length < 8) {
            setErrorMsg("Password should be atleast 8 characters long");
            return;
        }
        else if (!validatePassword(userData.newPassword)) {
            setErrorMsg("Password should contain atleast 1 uppercase letter, 1 special character and 1 number");
            return;
        }
        else if (userData.newPassword === "password" || userData.newPassword === "12345678" || userData.newPassword === "123456789" || userData.newPassword === "1234567890" || userData.newPassword === "00000000" || userData.newPassword === "qwerty123") {
            setErrorMsg("Password is too common");
            return;
        }
        else if (userData.newPassword === userData.currentPassword) {
            setErrorMsg("New password should be different from current password");
            return;
        }
        else if (userData.currentPassword !== userData.newPassword && userData.newPassword === userData.confirmPassword) {

            const changePass = {
                email: userData.email,
                currentPassword: userData.currentPassword,
                newPassword: userData.newPassword
            }
            setLoading(true);
            fetch(`https://${ip}/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(changePass),
            }).then(res => res.json())
                .then(data => {
                    setLoading(false);
                    if (data.message === "Password changed successfully") {
                        alert("Password changed successfully");
                        const removeData = async () => {
                            await AsyncStorage.removeItem('name');
                            await AsyncStorage.removeItem('email');
                            await AsyncStorage.removeItem('api');
                            await AsyncStorage.removeItem('alreadyLoggedIn');
                            await AsyncStorage.removeItem('token');
                            await AsyncStorage.removeItem('avatar');
                            await AsyncStorage.removeItem('avatarTemp');
                        }
                        removeData();
                        navigation.replace("Login");
                    }
                    else if (data.message === "Current Password is Incorrect") {
                        setErrorMsg("Current Password is Incorrect");
                    }
                }).catch((err) => {
                    setLoading(false);
                    setErrorMsg("Something went wrong, Please Try Again");
                    console.log(err);
                })
        }

    }
    return (
        <View style={styles.container}>
            <View style={topNav}>
                <TouchableOpacity onPress={handleBack} style={[navIconContainer,{left:25}]}>
                    <Ionicons name="chevron-back-outline" size={24} color="#fff" style={navIcon} />
                </TouchableOpacity>
                <Text style={navText}>Change Password</Text>
            </View>
            {loading ? <ActivityIndicator size="large" color="#fff" style={loader} /> :
                <>
                    <View style={[content, { marginTop: 25 }]}>
                        <View style={inputContainer}>
                            <TextInput
                                style={input}
                                onChangeText={(text) => setUserData({ ...userData, currentPassword: text })}
                                onPressIn={() => setErrorMsg(null)}
                                placeholder="Current Password"
                                placeholderTextColor="#b4b7bf"
                                clearButtonMode='always' />
                        </View>
                        <View style={inputContainer}>
                            <TextInput
                                style={input}
                                onChangeText={(text) => setUserData({ ...userData, newPassword: text })}
                                onPressIn={() => setErrorMsg(null)}
                                placeholder="New Password"
                                secureTextEntry={secureTextEntryPass}
                                placeholderTextColor="#b4b7bf"
                                clearButtonMode='always' />
                            <TouchableOpacity onPress={toggleSecureTextEntryPass}>
                                <Ionicons name={secureTextEntryPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#b4b7bf" style={{ paddingRight: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={inputContainer}>
                            <TextInput
                                style={input}
                                onChangeText={(text) => setUserData({ ...userData, confirmPassword: text })}
                                onPressIn={() => setErrorMsg(null)}
                                placeholder="Confirm Password"
                                secureTextEntry={secureTextEntryConfPass}
                                placeholderTextColor="#b4b7bf"
                                clearButtonMode='always' />
                            <TouchableOpacity onPress={toggleSecureTextEntryConfPass}>
                                <Ionicons name={secureTextEntryConfPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#b4b7bf" style={{ paddingRight: 20 }} />
                            </TouchableOpacity>
                        </View>
                        {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity>
                            <Text style={[button1, { marginTop: 10 }]} onPress={handlePassChange}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17181F',
    },
    navBar: {
        height: 55,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        width: '100%',
        position: 'absolute',
        bottom: 30,
    },
});

//make this component available to the app
export default ChangePassword;
