import React, { useEffect, useState } from "react";
import {View,TextInput,Text,StyleSheet,Image,TouchableOpacity, ActivityIndicator,} from "react-native";
import { error1, input, inputContainer, title, title2 } from "../css/logincss";
import { button1 } from "../css/buttoncss";
import ip from "./ip";
import { loader } from "../css/loadercss";

function ForgotPass2({ navigation, route}){
  const {changepass} = route.params;
  const [userPass, setUserPass] = useState({newPassword: "", confirmNew: ""});
  const [userCode, setUserCode] = useState("xxxxxx");
  const [actualCode, setActualCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const bg = require("../images/loginBG.png");

  useEffect(() => {
    setActualCode(changepass?.VerificationCode);
}, []);

  const handleChange = () => {
    if (userPass.newPassword == "" || userPass.confirmPassword == "" || userCode == "") {
      setErrorMsg("All fields are required");
      return;
    }
    else if(userCode=="xxxxxx" || userCode==""){
      setErrorMsg("Please enter the verification code");
      return;
    }
    else if(userCode.length!=6){
      setErrorMsg("Please enter a valid verification code");
      return;
    }
    else if(userCode!=actualCode){
      setErrorMsg("Verification Code Incorrect");
      return;
    }
    else if(userPass.newPassword !== userPass.confirmNew){
      setErrorMsg("Passwords do not match");
      return;
    }
    else if(userPass.newPassword == userPass.confirmNew && userCode==actualCode){
      const uploadData = {
        email: changepass?.email,
        password: userPass?.newPassword,
      };
      setLoading(true);
      fetch(`https://${ip}/forgot-password-change`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          if(data.message==="Password changed successfully"){
            // alert(data.message);
            navigation.navigate("Login");
          }
          else{
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

    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={bg} />
        {loading ? (
        <ActivityIndicator size="large" color="#fff" style={loader}/>):(
        <View style={styles.content}>
          <Text style={title}>Reset Password</Text>
          <Text style={title2}>A verification code has been sent to you at {changepass?.email}</Text>
          <View style={inputContainer}>
            <TextInput
              style={input}
              onChangeText={(text)=>setUserCode(text)}
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
                setUserPass({ ...userPass, newPassword: text })
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
                setUserPass({ ...userPass, confirmNew: text })
              }
              onPressIn={() => setErrorMsg(null)}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#b4b7bf"
            />
          </View>
          {errorMsg ? <Text style={error1}>{errorMsg}</Text> : null}
          <TouchableOpacity>
            <Text style={button1} onPress={handleChange}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
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
