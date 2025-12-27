import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeTabs from "./HomeTabs";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ todos, setTodos }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home">
        {(props) => (
          <HomeTabs
            {...props}
            todos={todos}
            setTodos={setTodos}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
