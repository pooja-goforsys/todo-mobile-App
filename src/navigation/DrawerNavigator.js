import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeTabs from "./HomeTabs";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import MeetingsScreen from "../screens/MeetingsScreen"; 
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();
const TODOS_KEY = "SAVED_TODOS";

const DrawerNavigator = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const loadTodos = async () => {
    try {
      const saved = await AsyncStorage.getItem(TODOS_KEY);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Failed to load todos", e);
    }
  };

  const saveTodos = async (data) => {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(data));
    } catch (e) {
      console.log("Failed to save todos", e);
    }
  };

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home">
        {(props) => (
          <HomeTabs
            {...props}
            todos={todos}
            setTodos={setTodos}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="Dashboard">
        {(props) => (
          <DashboardScreen {...props} todos={todos} />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Meetings"
        component={MeetingsScreen}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Drawer.Screen name="Settings">
        {(props) => (
          <SettingsScreen
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
