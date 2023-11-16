import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image,} from 'react-native';
import { forgotPassword, input, inputContainer } from '../css/logincss';
import { button1 } from '../css/buttoncss';

function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const bg = require("../images/loginBG.png");
  const handleSignup = () => {
    navigation.navigate('Home');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={bg} />
      <View style={styles.content}>
      <View style={inputContainer}>
          <TextInput
            style={input}
            onChangeText={setName}
            value={name}
            placeholder="Name"
            placeholderTextColor="#b4b7bf"
          />
        </View>
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
            onChangeText={setDeviceID}
            value={deviceID}
            placeholder="Device ID"
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
        <View style={styles.buttonContainer}>
          <Text style={button1} onPress={handleSignup}>Sign Up</Text>
          <Text style={styles.signup1}>Already have an account?&nbsp;<Text style={styles.signup2} onPress={handleLogin}>Login</Text></Text>
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
    top: "18%",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: 25,
  },
  buttonContainer: {
    paddingTop: "15%",
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

export default Signup;