import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, } from "react-native";
import { content, error1, input, inputContainer, title, title1, title2 } from "../../css/logincss";
import { button1, buttonContainer } from "../../css/buttoncss";
import { MaterialIcons, Feather, Ionicons } from 'react-native-vector-icons';
import ip from "../ip";
import { loader } from "../../css/loadercss";

function ForgotPass2({ navigation, route }) {
  const { changepass } = route.params;
  const [userPass, setUserPass] = useState({ newPassword: "", confirmNew: "" });
  const [userCode, setUserCode] = useState("xxxxxx");
  const [actualCode, setActualCode] = useState(null);
  const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
  const [secureTextEntryConfPass, setSecureTextEntryConfPass] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const bg = require("../../images/loginBG.png");

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    setActualCode(changepass?.VerificationCode);
  }, []);

  const toggleSecureTextEntryPass = () => {
    setSecureTextEntryPass(!secureTextEntryPass);
  };
  const toggleSecureTextEntryConfPass = () => {
    setSecureTextEntryConfPass(!secureTextEntryConfPass);
  };

  const handleChange = () => {
    if (userPass.newPassword == "" || userPass.confirmPassword == "" || userCode == "") {
      setErrorMsg("All fields are required");
      return;
    }
    else if (userCode == "xxxxxx" || userCode == "") {
      setErrorMsg("Please enter the verification code");
      return;
    }
    else if (userCode.length != 6) {
      setErrorMsg("Please enter a valid verification code");
      return;
    }
    else if (userCode != actualCode) {
      setErrorMsg("Verification Code Incorrect");
      return;
    }
    else if (userPass.newPassword !== userPass.confirmNew) {
      setErrorMsg("Passwords do not match");
      return;
    }
    else if (userPass.newPassword.length < 8) {
      setErrorMsg("Password should be atleast 8 characters long");
      return;
    }
    else if (!validatePassword(userPass.newPassword)) {
      setErrorMsg("Password should contain atleast 1 uppercase letter, 1 special character and 1 number");
      return;
    }
    else if (userPass.newPassword === "password" || userPass.newPassword === "12345678" || userPass.newPassword === "123456789" || userPass.newPassword === "1234567890" || userPass.newPassword === "00000000" || userPass.newPassword === "qwerty123") {
      setErrorMsg("Password is too common");
      return;
    }
    else if (userPass.newPassword == userPass.confirmNew && userCode == actualCode) {
      const uploadData = {
        email: changepass?.email,
        password: userPass?.newPassword,
      };
      setLoading(true);
      fetch(`https://${ip}/forgot-password-change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          if (data.message === "Password changed successfully") {
            alert(data.message);
            navigation.navigate("Login");
          }
          else {
            alert("Something went wrong!!! Please try again");
            navigation.navigate("ForgotPass1");
          }
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg("Something went wrong, Please Try Again");
          console.log(err);
        });
    }
  };

  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={bg} />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader} />) : (
        <>
          <View style={[title, { marginTop: "15%", marginBottom: 20 }]}>
            <Text style={title1}>Reset Password</Text>
            <Text style={title2}>A verification code has been sent to you at {changepass?.email}</Text>
          </View>
          <View style={content}>
            <View style={inputContainer}>
              <TextInput
                style={input}
                onChangeText={(text) => setUserCode(text.replace(/\s/g, ''))}
                onPressIn={() => setErrorMsg(null)}
                placeholder="Enter 6 Digit Verification Code"
                placeholderTextColor="#b4b7bf"
              />
            </View>
            <View style={inputContainer}>
              <TextInput
                style={input}
                textContentType="password"
                onChangeText={(text) =>
                  setUserPass({ ...userPass, newPassword: text.replace(/\s/g, '') })
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
                  setUserPass({ ...userPass, confirmNew: text.replace(/\s/g, '') })
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
          <View style={[buttonContainer, { marginTop: 20 }]}>
            <TouchableOpacity>
              <Text style={button1} onPress={handleChange}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
});

export default ForgotPass2;
