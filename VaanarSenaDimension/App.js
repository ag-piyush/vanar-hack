import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./components/Home";
import SpeechToText from "./components/SpeechToText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import LoginPage from "./components/Login";
import { createStackNavigator } from "@react-navigation/stack";

import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Geofencing from "./components/Geofencing";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
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
      label: "Maps",
      component: Geofencing,
      onFocusBgColor: "#00aaaa",
    },
    {
      label: "Home2",
      component: Home,
      onFocusBgColor: "#aaaa00",
    },
  ];

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
              <MaterialCommunityIcons
                name={focused ? "home" : "bell"}
                color={color}
                size={26}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerLeft: null }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerLeft: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
