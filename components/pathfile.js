import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../components/Login&SignUP/login";
import Signup from "../components/Login&SignUP/signup";
import Verify from "../components/Login&SignUP/verification";
import ForgotPass1 from "../components/Login&SignUP/forgotpass1";
import ForgotPass2 from "../components/Login&SignUP/forgotpass2";
import Onboarding from "./onboarding/onboarding";
import BottomTabs from "./App Pages/Navigation/tabs";
import Help from "./App Pages/help&support";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from "react-native";


function Pathfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createStackNavigator();

  // const checkOnboarding = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('alreadyLaunched');
  //     if (value !== null) {
  //       setAlreadyLaunched(true);
  //     }
  //   } catch (error) {
  //     console.log('error @checkOnboarding: ', error);
  //   }
  // };

  // const checkLogin = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('alreadyLoggedIn');
  //     if (value !== null) {
  //       setAlreadyLoggedIn(true);
  //     }
  //   } catch (error) {
  //     console.log('error @checkLogin: ', error);
  //   }
  // };

  useEffect(() => {
    const checkOnboarding = async () => {
      const alreadyOnboarded = await AsyncStorage.getItem('alreadyOnboarded');
      const alreadyLoggedIn = await AsyncStorage.getItem('alreadyLoggedIn');
      console.log('alreadyOnboarded:', alreadyOnboarded); // Add this line
      console.log('alreadyLoggedIn:', alreadyLoggedIn); // Add this line
      setIsOnboarded(alreadyOnboarded === 'true');
      setIsLoggedIn(alreadyLoggedIn === 'true');
      setIsLoading(false);
    };
  
    checkOnboarding();
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1295b8" />
      </View>
    )
  }
  if (!isOnboarded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
          <Stack.Screen name="BottomNav" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
          <Stack.Screen name="BottomNav" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNav">
        <Stack.Screen name="BottomNav" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
        <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Pathfile;