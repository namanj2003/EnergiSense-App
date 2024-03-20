import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler } from 'react-native';
import { content, error1, forgotPassword, input, inputContainer, title, titleText } from '../../css/logincss';
import { MaterialIcons, Feather, Ionicons } from 'react-native-vector-icons';
import { button1, buttonContainer } from '../../css/buttoncss';
import ip from '../ip';
import { loader } from '../../css/loadercss';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const bg = require("../../images/loginBG.png");

  const toggleSecureTextEntryPass = () => {
    setSecureTextEntryPass(!secureTextEntryPass);
  };

  const handleLogin = async() => {
    // console.log(userData);
    if (userData.email === "" || userData.password === "") {
      setErrorMsg("All fields are required");
      return;
    }
    if (!validateEmail(userData.email)) {
      setErrorMsg("Invalid email address");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://${ip}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      const data = await response.json();
          if (data.message === "User Not Found") {
            setErrorMsg("User Not Found");
            setLoading(false);
            return;
          }
          if (data.message === "Invalid Credentials") {
            setErrorMsg("Invalid Credentials");
            setLoading(false);
            return;
          }
          if (data.message === "Password matched") {
            const storeData = async () => {
              try {
                await AsyncStorage.setItem('alreadyLoggedIn', 'true');
                await AsyncStorage.setItem('api', data.apikey.deviceID);
                await AsyncStorage.setItem('email', data.apikey.email);
                await AsyncStorage.setItem('name', data.apikey.name);
                await AsyncStorage.setItem('token', data.token);
                // console.log('data.token', data.token);
                // console.log('data.apikey.id', data.apikey.deviceID);
                // console.log('data.apikey.email', data.apikey.email);
                // console.log('data.apikey.name', data.apikey.name);
              } catch (error) {
                console.log('error @loggedin ', error);
              }
            }
            storeData();
            // console.log(data)
            navigation.replace("BottomNav");
          }
        }
        catch (err) {
          setLoading(false);
          setErrorMsg("Network request failed. Please check your internet connection and try again.");
          console.log("error@login:", err);
        };
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPass1');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={bg} resizeMode='cover'/>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader} />) : (
        <>
          <View style={[title, { marginTop: "15%", marginBottom: 40 }]}>
            <Text style={titleText}>Login</Text>
          </View>
          <View style={content}>
            <View style={[inputContainer, { marginVertical: 15 }]}>
              <TextInput
                style={input}
                onChangeText={(text) => setUserData({ ...userData, email: text.toLowerCase().replace(/\s/g, '') })}
                onPressIn={() => setErrorMsg(null)}
                placeholder="Email"
                placeholderTextColor="#b4b7bf"
                clearButtonMode='always' />
            </View>
            <View style={inputContainer}>
              <TextInput
                style={input}
                onChangeText={(text) => setUserData({ ...userData, password: text.replace(/\s/g, '') })}
                onPressIn={() => setErrorMsg(null)}
                placeholder="Password"
                secureTextEntry={secureTextEntryPass}
                placeholderTextColor="#b4b7bf"
                clearButtonMode='always' />
              <TouchableOpacity onPress={toggleSecureTextEntryPass}>
                <Ionicons name={secureTextEntryPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#b4b7bf" style={{ paddingRight: 20 }} />
              </TouchableOpacity>
            </View>
            <View onPress={handleForgotPassword} style={styles.fp}>
              <Text style={forgotPassword} onPress={handleForgotPassword}>Forgot Password?</Text>
            </View>
            {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
          </View>
          <View style={buttonContainer}>
            <TouchableOpacity>
              <Text style={button1} onPress={handleLogin}>Login</Text>
            </TouchableOpacity>
            <View style={{ paddingTop: 10, paddingBottom: 20 }}>
              <Text style={[styles.signupText, { color: "grey" }]}>Don't have an account?&nbsp;
                <Text style={[styles.signupText, { color: "#b4b7bf" }]} onPress={handleSignup}>Sign Up</Text>
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
  content: {
    paddingTop: "20%",
    height: "50%",
    paddingHorizontal: 25,
    justifyContent: "center",
    width: "100%",
    marginBottom: 50,
  },
  fp: {
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 5,
    marginTop:10
  },
  signupText: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  }
});

export default Login;