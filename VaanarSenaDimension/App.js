import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./components/Home";
import SpeechToText from "./components/SpeechToText";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

import LoginPage from "./components/Login";
import { createStackNavigator } from "@react-navigation/stack";

import { Button, LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

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

function HomeTabs() {
  return (
    <Tab.Navigator shifting={true} barStyle={{ backgroundColor: "steelblue" }}>
      {Routes.map((r, key) => (
        <Tab.Screen
          key={key}
          name={r.label}
          component={r.component}
          options={{
            tabBarLabel: r.label,
            tabBarColor: r.onFocusBgColor,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? "home" : "bell"} color={color} size={26} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const App = () => {
  const [barColor, setBarColor] = useState("tomato");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerRight: () => <Button title="Sign out" />,
          }}
        />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
