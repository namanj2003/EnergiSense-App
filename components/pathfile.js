import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import Onboarding1 from "../Old Oboarding/onboarding1";
// import Onboarding2 from "../Old Onboarding/onboarding2";
// import Onboarding3 from "../Old Onboarding/onboarding3";
import Homepage from "../components/homepage";
import Login from "../components/login";
import Signup from "../components/signup";
import { createStackNavigator } from "@react-navigation/stack";
import Verify from "../components/verification";
import ForgotPass1 from "../components/forgotpass1";
import ForgotPass2 from "../components/forgotpass2";
import Onboarding from "../onboarding/onboarding";
import HistoricalData from "./historyData";
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from "react-native";


function Pathfile() {
  const [alreadyLaunched, setAlreadyLaunched] = useState(null);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkOnboarding = async () => {
    try {
      const value = await SecureStore.getItemAsync('alreadyLaunched');
      if (value !== null) {
        setAlreadyLaunched(true);
      }
    } catch (error) {
      console.log('error @checkOnboarding: ', error);
    }
  };

  const checkLogin = async () => {
    try {
      const value = await SecureStore.getItemAsync('alreadyLoggedIn');
      if (value !== null) {
        setAlreadyLoggedIn(true);
      }
    } catch (error) {
      console.log('error @checkLogin: ', error);
    }
  };

  useEffect(() => {
    Promise.all([checkOnboarding(), checkLogin()]).then(() => setIsLoading(false));
  }, []);
  
  const Stack = createStackNavigator();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1295b8" />
      </View>
    )
  }
  return (
    <NavigationContainer>
      {alreadyLaunched ?
        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Screen name="Onboarding1" component={Onboarding1} options={{headerShown:false}}/> */}
          {/* <Stack.Screen name="Onboarding2" component={Onboarding2} options={{headerShown:false}}/> */}
          {/* <Stack.Screen name="Onboarding3" component={Onboarding3} options={{headerShown:false}}/> */}
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Homepage} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
          <Stack.Screen name="HistoricalData" component={HistoricalData} options={{ headerShown: false }} />
        </Stack.Navigator> :
        alreadyLoggedIn ?
          <Stack.Navigator initialRouteName="Home">
            {/* <Stack.Screen name="Onboarding1" component={Onboarding1} options={{headerShown:false}}/> */}
            {/* <Stack.Screen name="Onboarding2" component={Onboarding2} options={{headerShown:false}}/> */}
            {/* <Stack.Screen name="Onboarding3" component={Onboarding3} options={{headerShown:false}}/> */}
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Homepage} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
            <Stack.Screen name="HistoricalData" component={HistoricalData} options={{ headerShown: false }} />
          </Stack.Navigator> :
          <Stack.Navigator initialRouteName="Onboarding">
            {/* <Stack.Screen name="Onboarding1" component={Onboarding1} options={{headerShown:false}}/> */}
            {/* <Stack.Screen name="Onboarding2" component={Onboarding2} options={{headerShown:false}}/> */}
            {/* <Stack.Screen name="Onboarding3" component={Onboarding3} options={{headerShown:false}}/> */}
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Homepage} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
            <Stack.Screen name="HistoricalData" component={HistoricalData} options={{ headerShown: false }} />
          </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

export default Pathfile;