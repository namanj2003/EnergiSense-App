import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { forgotPassword, input, inputContainer } from '../css/logincss';
import { button1 } from '../css/buttoncss';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const bg = require("../images/loginBG.png");
  const handleLogin = () => {
    navigation.navigate('Home');
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={bg} />
      <View style={styles.content}>
        <View style={inputContainer}>
          <TextInput
            style={input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#b4b7bf"
          />
        </View>
        <View style={inputContainer}>
          <TextInput
            style={input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#b4b7bf"
          />
        </View>
        <View onPress={handleForgotPassword} style={styles.fp}>
          <Text style={forgotPassword}>Forgot Password?</Text>
        </View>
        <View style={styles.buttonContainer}>
        <Text style={button1} onPress={handleLogin}>Login</Text>
        <Text style={styles.signup1}>Don't have an account?&nbsp;<Text style={styles.signup2} onPress={handleSignup}>Sign Up</Text></Text>
        </View>
        
      </View>

      

    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff"
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
  buttonContainer: {
    paddingTop: "43%",
    display: "flex",
    alignItems: "center",
    width: "100%",
    position: "relative",
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