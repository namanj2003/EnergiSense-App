import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { error1, forgotPassword, input, inputContainer, title, title2 } from '../css/logincss';
import { button1 } from '../css/buttoncss';
import ip from './ip';

function ForgotPass1({ navigation }) {
  const [email1, setEmail1] = useState({ email: ""});
  const [errorMsg, setErrorMsg] = useState(null);
  const bg = require("../images/loginBG.png");

  const handleForgotPassword = () => {
    
    if(email1.email==""){
        setErrorMsg("Please enter the email address");
        return;
    }
    else if(!validateEmail(email1.email)) {
            setErrorMsg("Invalid email address");
            return;
        }
    else{
        fetch(`https://${ip}/forgot-password-check`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email1),
        })
        .then(res => res.json())
        .then(data => {
            if(data.message==="Verification Code sent to your email to reset your password"){
                alert(data.message);
                navigation.navigate("ForgotPass2",{changepass: data.resetData});
            }
            else{
                alert("User does not exist");
                navigation.navigate("Signup");
            }
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
      <View style={styles.content}>
        <Text style={title}>Forgot Password?</Text>
        <Text style={title2}>Enter the Email ID you used to create account</Text>
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
        <TouchableOpacity>
          <Text style={button1} onPress={handleForgotPassword} on>
            Get Verification Code
          </Text>
        </TouchableOpacity>
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
});

export default ForgotPass1;