import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { content, error1, forgotPassword, input, inputContainer, title, title1, title2 } from '../../css/logincss';
import { button1, buttonContainer } from '../../css/buttoncss';
import ip from '../ip';
import { loader } from '../../css/loadercss';

function ForgotPass1({ navigation }) {
  const [email1, setEmail1] = useState({ email: "" });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const bg = require("../../images/loginBG.png");
//
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //   });
  //   return unsubscribe;
  // }, [navigation]);
//
  const handleForgotPassword = () => {
    if (email1.email == "") {
      setErrorMsg("Please enter the email address");
      return;
    }
    else if (!validateEmail(email1.email)) {
      setErrorMsg("Invalid email address");
      return;
    }
    else {
      setLoading(true);
      fetch(`https://${ip}/forgot-password-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email1),
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          if (data.message === "Verification Code sent to your email to reset your password") {
            navigation.navigate("ForgotPass2", { changepass: data.resetData });
          }
          else {
            alert("User does not exist");
            navigation.navigate("Signup");
          }
        }).catch((err) => {
          setLoading(false);
          setErrorMsg("Something went wrong, Please Try Again");
          console.log(err);
        });
    }


  };
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bg} source={bg} />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader} />) : (
        <>
          <View style={[title,{marginTop:"15%",marginBottom:30}]}>
            <Text style={title1}>Forgot Password?</Text>
            <Text style={title2}>Enter the Email ID you used to create account</Text>
          </View>
          <View style={[content,{paddingTop:0,justifyContent:"flex-start"}]}>
            <View style={inputContainer}>
              <TextInput
                style={input}
                onChangeText={(text) => setEmail1({ ...email1, email: text })}
                onPressIn={() => setErrorMsg(null)}
                placeholder="Email"
                placeholderTextColor="#b4b7bf"
                clearButtonMode='always'
              />
            </View>
            {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
          </View>
          
          <View style={[buttonContainer,{marginTop:10}]}>
          <TouchableOpacity>
            <Text style={button1} onPress={handleForgotPassword} on>
              Get Verification Code
            </Text>
          </TouchableOpacity>
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
});

export default ForgotPass1;