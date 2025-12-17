import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const EditTodoScreen = ({ route, navigation, todos, setTodos }) => {
  const { todoId } = route.params;
  const todo = todos.find((t) => t.id === todoId);

  const [title, setTitle] = useState(todo.title);

  const updateTodo = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId ? { ...t, title } : t
      )
    );
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={globalStyles.input}
      />
      <Button title="Update Todo" onPress={updateTodo} />
    </View>
  );
};

export default EditTodoScreen;
