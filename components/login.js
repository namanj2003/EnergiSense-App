import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { error1, forgotPassword, input, inputContainer, title } from '../css/logincss';
import { button1 } from '../css/buttoncss';

function Login({ navigation }) {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState(null);
  const bg = require("../images/loginBG.png");

  const handleLogin = () => {
    // console.log(userData);
    if (userData.email === "" || userData.password === "") {
      setErrorMsg("All fields are required");
      return;
    } else {
      if (!validateEmail(userData.email)) {
        setErrorMsg("Invalid email address");
        return;
      } else {
        fetch("http://10.0.2.2.:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
              setErrorMsg(data.error);
            } else {
              alert("Login Successful");
              navigation.navigate("Home");
            }
          });
      }
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
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
      <Image style={styles.bg} source={bg} />
      <View style={styles.content}>
        <Text style={title}>Login</Text>
        <View style={inputContainer}>
          <TextInput
            style={input}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            onPressIn={() => setErrorMsg(null)}
            placeholder="Email"
            placeholderTextColor="#b4b7bf"
            clearButtonMode='always'
          />
        </View>
        <View style={inputContainer}>
          <TextInput
            style={input}
            onChangeText={(text) => setUserData({ ...userData, password: text })}
            onPressIn={() => setErrorMsg(null)}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#b4b7bf"
            clearButtonMode='always'

          />
        </View>
        <View onPress={handleForgotPassword} style={styles.fp}>
          <Text style={forgotPassword}>Forgot Password?</Text>
        </View>
        {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
        <TouchableOpacity>
          <Text style={button1} onPress={handleLogin} on>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={styles.signup1}>
          Don't have an account?&nbsp;
          <Text style={styles.signup2} onPress={handleSignup}>
            Sign Up
          </Text>
        </Text>
      </View>
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
    top: "30%",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: 25,
  },
  fp: {
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 5,
  },
  signup1: {
    fontSize: 17,
    fontWeight: "600",
    color: "grey",
    textAlign: "center",
    paddingVertical: 5,
  },
  signup2: {
    fontSize: 17,
    fontWeight: "600",
    color: "#b4b7bf",
  },
});

export default Login;