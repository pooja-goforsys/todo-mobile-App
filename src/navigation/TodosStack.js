
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoListScreen from '../screens/TodoListScreen';
import AddTodoScreen from '../screens/AddTodoScreen';
import EditTodoScreen from '../screens/EditTodoScreen';

const Stack = createNativeStackNavigator();

const TodosStack = ({ todos, setTodos }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodoList">
        {props => (
          <TodoListScreen {...props} todos={todos} setTodos={setTodos} />
        )}
      </Stack.Screen>

      <Stack.Screen name="AddTodo">
        {props => <AddTodoScreen {...props} setTodos={setTodos} />}
      </Stack.Screen>

      <Stack.Screen name="EditTodo">
        {props => (
          <EditTodoScreen {...props} todos={todos} setTodos={setTodos} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default TodosStack;
