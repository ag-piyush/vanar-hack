import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./components/Home";
import SpeechToText from "./components/SpeechToText";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Tab = createMaterialBottomTabNavigator();

const Routes = [
  {
    label: "Home",
    component: Home,
    onFocusBgColor: "#00aa00",
  },
  {
    label: "Audio Book",
    component: SpeechToText,
    onFocusBgColor: "#00aaaa",
  },
  {
    label: "Home2",
    component: Home,
    onFocusBgColor: "#aaaa00",
  },
];

export default App = () => {
  const [barColor, setBarColor] = useState("tomato");

  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={true}
        barStyle={{ backgroundColor: "steelblue" }}
      >
        {Routes.map((r, key) => {
          return (
            <Tab.Screen
              key={key}
              name={r.label}
              component={r.component}
              options={{
                tabBarLabel: r.label,
                tabBarColor: r.onFocusBgColor,
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name={focused ? "home" : "bell"}
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          );
        })}
        {/* <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "home" : "bell"} color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="AudioBook" component={SpeechToText} options={{
          tabBarLabel: 'AudioBook',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "home" : "bell"} color={color} size={26} />
          ),
        }}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
