import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { content, error1, input, inputContainer, title, titleText } from "../../css/logincss";
import { button1, buttonContainer } from "../../css/buttoncss";
import { MaterialIcons, Feather, Ionicons } from 'react-native-vector-icons';
import ip from "../ip";
import { loader } from "../../css/loadercss";

function Signup({ navigation }) {
  const [userData, setUserData] = useState({ name: "", email: "", deviceID: "", password: "", confirmPassword: "", });
  const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
  const [secureTextEntryConfPass, setSecureTextEntryConfPass] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const bg = require("../../images/loginBG.png");

  const toggleSecureTextEntryPass = () => {
    setSecureTextEntryPass(!secureTextEntryPass);
  };
  const toggleSecureTextEntryConfPass = () => {
    setSecureTextEntryConfPass(!secureTextEntryConfPass);
  };

  const handleVerification = () => {
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
      }
      else if (userData.password.length < 8) {
        setErrorMsg("Password should be atleast 8 characters long");
        return;
      }
      else if (!validatePassword(userData.password)) {
        setErrorMsg("Password should have the first letter in capital, atleast 1 number, atleast 1 special character");
        return;
      }
      else if (userData.password === "password" || userData.password === "12345678" || userData.password === "123456789" || userData.password === "1234567890" || userData.password === "00000000" || userData.password === "qwerty123") {
        setErrorMsg("Password is too common");
        return;
      }
      else {
        setLoading(true);
        fetch(`https://${ip}/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then(res => res.json()).then(
            data => {
              setLoading(false);
              if (data.error === "Email or Device ID already used") {
                setErrorMsg("Email or Device ID already used");
              }
              else if (data.message === "Verification Code sent to your email") {
                alert(data.message);
                navigation.navigate("Verify", { userdata: data.udata });
              }
            }
          ).catch((err) => {
            setLoading(false);
            setErrorMsg("Something went wrong, Please Try Again");
            console.log(err);
          });
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

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/;
    return regex.test(password);
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.bg} source={bg} />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader} />) : (
        <>
          <View style={title}>
            <Text style={titleText}>Sign Up</Text>
          </View>
          <View style={content}>

            <View style={inputContainer}>
              <TextInput
                textContentType="name"
                style={input}
                onChangeText={(text) => setUserData({ ...userData, name: text.trim() })}
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
                onChangeText={(text) => setUserData({ ...userData, email: text.toLowerCase().replace(/\s/g, '') })}
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
                  setUserData({ ...userData, deviceID: text.replace(/\s/g, '') })
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
                  setUserData({ ...userData, password: text.replace(/\s/g, '') })
                }
                onPressIn={() => setErrorMsg(null)}
                placeholder="Password"
                secureTextEntry={secureTextEntryPass}
                placeholderTextColor="#b4b7bf"
              />
              <TouchableOpacity onPress={toggleSecureTextEntryPass}>
                <Ionicons name={secureTextEntryPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#b4b7bf" style={{ paddingRight: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={inputContainer}>
              <TextInput
                style={input}
                textContentType="password"
                onChangeText={(text) =>
                  setUserData({ ...userData, confirmPassword: text.replace(/\s/g, '') })
                }
                onPressIn={() => setErrorMsg(null)}
                placeholder="Confirm Password"
                secureTextEntry={secureTextEntryConfPass}
                placeholderTextColor="#b4b7bf"
              />
              <TouchableOpacity onPress={toggleSecureTextEntryConfPass}>
                <Ionicons name={secureTextEntryConfPass ? 'eye-off-outline' : 'eye-outline'} size={20} color="#b4b7bf" style={{ paddingRight: 20 }} />
              </TouchableOpacity>
            </View>
            {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
          </View>
          <View style={[buttonContainer, { marginTop: 70 }]}>
            <TouchableOpacity>
              <Text style={button1} onPress={handleVerification}>Sign Up</Text>
            </TouchableOpacity>
            <View style={{ paddingTop: 10, paddingBottom: 20 }}>
              <Text style={styles.signup1}>Already have an account?&nbsp;
                <Text style={styles.signup2} onPress={handleLogin}>Login</Text>
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
