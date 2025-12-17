import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All" component={StackNavigator} />
      <Tab.Screen name="Overdue" component={StackNavigator} />
      <Tab.Screen name="Completed" component={StackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
