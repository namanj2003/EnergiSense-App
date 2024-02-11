import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { content, error1, input, inputContainer, title, title1, title2 } from '../../css/logincss';
import { button1, buttonContainer } from '../../css/buttoncss';
import ip from '../ip';
import { loader } from '../../css/loadercss';

function Verify({ navigation, route }) {
  const { userdata } = route.params;
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userCode, setUserCode] = useState("xxxxxx");
  const [actualCode, setActualCode] = useState(null);
  const bg = require("../../images/Bg.png");


  useEffect(() => {
    setActualCode(userdata?.VerificationCode);
  }, []);

  const handleSignup = () => {
    // console.log(userCode);
    // console.log(actualCode);
    if (userCode == "xxxxxx" || userCode == "") {
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
    else if (userCode == actualCode) {
      // console.log("Verification Successful");
      const uploadData = {
        name: userdata?.name,
        email: userdata?.email,
        deviceID: userdata?.deviceID,
        password: userdata?.password,
      };
      setLoading(true);
      fetch(`https://${ip}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          if (data.message === "User Registered Successfully") {
            // alert(data.message);
            navigation.navigate("Login");
          }
          else {
            alert("Something went wrong!!! Please try again");
            navigation.navigate("Signup");
          }
        }).catch((err) => {
          setLoading(false);
          setErrorMsg("Something went wrong, Please Try Again");
          console.log(err);
        });
    }

    else if (userCode != actualCode) {
      setErrorMsg("Invalid verification code");
      return;
    }
  }
  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={bg} />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader} />) : (
        <>
          <View style={content}>
            <View style={[title, { marginTop: "20%", marginBottom: 20 }]}>
              <Text style={title1}>Verify</Text>
              <Text style={title2}>A verification code has been sent to you at {userdata?.email}</Text>
            </View>
            <View style={inputContainer}>
              <TextInput
                style={input}
                onChangeText={(text) => setUserCode(text.toLowerCase().replace(/\s/g, ''))}
                onPressIn={() => setErrorMsg(null)}
                placeholder="Enter 6 Digit Verification Code"
                placeholderTextColor="#b4b7bf"
                clearButtonMode='always'

              />
            </View>
            {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
          </View>
          <View style={[buttonContainer,{marginTop:10}]}>
          <TouchableOpacity>
            <Text style={button1} onPress={handleSignup} on>
              Verify
            </Text>
          </TouchableOpacity>
          </View>
        </>
      )}
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

export default Verify;