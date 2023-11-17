import React, { useState } from "react";
import {View,TextInput,Text,StyleSheet,Image,TouchableOpacity,} from "react-native";
import { error1, input, inputContainer } from "../css/logincss";
import { button1 } from "../css/buttoncss";

function Signup({ navigation }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    deviceID: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const bg = require("../images/loginBG.png");
  const handleSignup = () => {
    if (userData.name == "" || userData.email == "" || userData.deviceID == "" || userData.password == "" || userData.confirmPassword == "") {
      setErrorMsg("All fields are required");
      return;
    } else {
      if (!validateEmail(userData.email)) {
        setErrorMsg("Invalid email address");
        return;
      } else if (userData.password !== userData.confirmPassword) {
        setErrorMsg("Passwords do not match");
        return;
      } else {
        fetch("http://10.0.2.2.:3001/signup", {
          method: "POST",
          headers: {"Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then(res => res.json()).then(
            data => {
            // console.log(data);
            if (data.error) {
              setErrorMsg(data.error);
            } else {
              alert(userData.name+"'s Account created successfully");
              navigation.navigate("Login");
            }
          }
          );
      }
    }
  };
    const handleLogin = () => {
      navigation.navigate("Login");
    };

    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={bg} />
        <View style={styles.content}>
          <View style={inputContainer}>
            <TextInput
            textContentType="name"
              style={input}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
              onPressIn={() => setErrorMsg(null)}
              placeholder="Name"
              placeholderTextColor="#b4b7bf"
              clearButtonMode="always"
            />
          </View>
          <View style={inputContainer}>
            <TextInput
            textContentType="emailAddress"
              style={input}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
              onPressIn={() => setErrorMsg(null)}
              placeholder="Email"
              placeholderTextColor="#b4b7bf"
            />
          </View>
          <View style={inputContainer}>
            <TextInput
              style={input}
              textContentType="username"
              onChangeText={(text) =>
                setUserData({ ...userData, deviceID: text })
              }
              onPressIn={() => setErrorMsg(null)}
              placeholder="Device ID"
              placeholderTextColor="#b4b7bf"
            />
          </View>
          <View style={inputContainer}>
            <TextInput
              style={input}
              textContentType="password"
              onChangeText={(text) =>
                setUserData({ ...userData, password: text })
              }
              onPressIn={() => setErrorMsg(null)}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#b4b7bf"
            />
          </View>
          <View style={inputContainer}>
            <TextInput
              style={input}
              textContentType="password"
              onChangeText={(text) =>
                setUserData({ ...userData, confirmPassword: text })
              }
              onPressIn={() => setErrorMsg(null)}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#b4b7bf"
            />
          </View>
          {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
          <TouchableOpacity>
            <Text style={button1} onPress={handleSignup}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text style={styles.signup1}>
            Already have an account?&nbsp;
            <Text style={styles.signup2} onPress={handleLogin}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    );
  };
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
      top: "15%",
      display: "flex",
      justifyContent: "center",
      width: "100%",
      padding: 25,
    },
    buttonContainer: {
      paddingTop: "20%",
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
