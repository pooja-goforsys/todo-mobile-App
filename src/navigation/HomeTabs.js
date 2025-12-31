import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import TodosStack from "./TodosStack";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const homeIcon = require("../assests/home.png");
const userIcon = require("../assests/user.png");
const settingsIcon = require("../assests/settings.png");

const HomeTabs = ({ todos, setTodos, setIsLoggedIn }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === "Home") {
            iconSource = homeIcon;
          } else if (route.name === "Profile") {
            iconSource = userIcon;
          } else if (route.name === "Settings") {
            iconSource = settingsIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                opacity: focused ? 1 : 0.5,
              }}
            />
          );
        },

        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      {/* HOME */}
      <Tab.Screen name="Home">
        {(props) => (
          <TodosStack
            {...props}
            todos={todos}
            setTodos={setTodos}
          />
        )}
      </Tab.Screen>

      {/* PROFILE */}
      <Tab.Screen name="Profile" component={ProfileScreen} />

      {/* SETTINGS — LOGOUT ENABLED */}
      <Tab.Screen name="Settings">
        {(props) => (
          <SettingsScreen
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeTabs;
