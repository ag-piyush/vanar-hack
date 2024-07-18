import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Home from "./components/Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AugmentedScreen from "./components/AugmentedScreen";

const Tab = createMaterialBottomTabNavigator();

export const ColorPrimary = "#71C9CE";
export const ColorSecondary = "#A6E3E9";
export const ColorTertiary = "#A6E3E9";

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={true}
        barStyle={{ backgroundColor: ColorPrimary }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "bell"}
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AR"
          component={AugmentedScreen}
          options={{
            tabBarLabel: "ARwow",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "bell"}
                color={color}
                size={26}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="SpeechToText"
          component={SpeechToText}
          options={{
            tabBarLabel: "SpeechToText",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "bell"}
                color={color}
                size={26}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="H2"
          component={Home}
          options={{
            tabBarLabel: "H2",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "bell"}
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
