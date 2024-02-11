import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons} from 'react-native-vector-icons';
import Home from '../homepage';
import Cost from '../cost';
import HistoricalData from '../historyData';
import { StyleSheet, View } from 'react-native';
import Profile from '../profile';

const BottomTab = createBottomTabNavigator();

function BottomTabs() {

  return (
    <>
    <View style={styles.container}>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color}) => {
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
            else if (route.name === 'Profile') {
              IconComponent = MaterialIcons;
              iconName = focused ? 'person' : 'person-outline';
            }
            return <IconComponent  name={iconName} size={30} color={color} />;
          },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#252732',
          borderTopColor: '#252732',
          height: 80,
          paddingTop: 15,
          paddingBottom: 15,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          marginTop: 10,
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
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  container:{
    height: "100%",
    backgroundColor: "#17181F",
  },
});

export default BottomTabs;