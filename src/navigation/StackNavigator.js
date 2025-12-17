import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "../screens/TodoListScreen";
import AddTodoScreen from "../screens/AddTodoScreen";
import EditTodoScreen from "../screens/EditTodoScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Todos" component={TodoListScreen} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} />
      <Stack.Screen name="EditTodo" component={EditTodoScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
