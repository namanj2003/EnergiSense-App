import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Homepage from '../homepage';
import HistoricalData from '../historyData';


const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}