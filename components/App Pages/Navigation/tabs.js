import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome, Foundation } from '@expo/vector-icons';
import Home from '../homepage';
import Cost from '../cost';
import HistoricalData from '../historyData';
import { StyleSheet, View } from 'react-native';

const BottomTab = createBottomTabNavigator();

function BottomTabs() {
  
  return (
    <View style={styles.container}>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent = Ionicons;
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'History') {
              IconComponent = MaterialIcons;
              iconName = focused ? 'history-toggle-off' : 'history-toggle-off';
            }
            else if (route.name === 'Cost') {
              IconComponent = MaterialIcons;
              iconName = focused ? 'monetization-on' : 'monetization-on';
            }
            return <IconComponent  name={iconName} size={30} color={color} />;
          },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#252732',
          borderTopColor: '#252732',
          height: 80,
          paddingTop: 10,
          paddingBottom: 25,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          marginTop: 30,
        },
        tabBarLabelStyle: {
          fontSize: 12, 
        },
        headerShown: false,
      })}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="History" component={HistoricalData} />
      <BottomTab.Screen name="Cost" component={Cost} />
    </BottomTab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    height: "100%",
    backgroundColor: "#17181F",
  },
});

export default BottomTabs;