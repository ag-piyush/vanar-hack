import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SpeechToText from './SpeechToText';
import Home from './Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default BottonNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
      <Tab.Screen name="Settings" component={SpeechToText} />
    </Tab.Navigator>
  );
}