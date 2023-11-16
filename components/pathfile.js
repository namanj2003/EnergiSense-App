import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding1 from "../onboarding/onboarding1";
import Onboarding2 from "../onboarding/onboarding2";
import Onboarding3 from "../onboarding/onboarding3";
import Homepage from "../components/homepage";
import Login from "../components/login";
import Signup from "../components/signup";
import { createStackNavigator } from "@react-navigation/stack";

function Pathfile() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding1" component={Onboarding1} options={{headerShown:false}}/>
        <Stack.Screen name="Onboarding2" component={Onboarding2} options={{headerShown:false}}/>
        <Stack.Screen name="Onboarding3" component={Onboarding3} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Homepage} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Pathfile;