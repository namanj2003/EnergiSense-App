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

import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from "react-native";


function Pathfile() {
  const [alreadyLaunched, setAlreadyLaunched] = useState(null);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createStackNavigator();

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
  // useEffect(() => {
  //   Promise.all(checkLogin()).then(() => setIsLoading(false));
  // },[]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1295b8" />
      </View>
    )
  }
  return (
    <NavigationContainer>
      {
  alreadyLaunched ? (
    alreadyLoggedIn ? (
      <Stack.Navigator initialRouteName="BottomNav">
        <Stack.Screen name="BottomNav" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
        <Stack.Screen name="BottomNav" component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  ) : (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPass1" component={ForgotPass1} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPass2" component={ForgotPass2} options={{ headerShown: false }} />
      <Stack.Screen name="BottomNav" component={BottomTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
    </NavigationContainer>
  );
}

export default Pathfile;