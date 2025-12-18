import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const EditTodoScreen = ({ route, navigation, todos, setTodos }) => {
  const { todoId } = route.params;
  const todo = todos.find((t) => t.id === todoId);

  const [ticketName, setTicketName] = useState(todo.ticketName);

  const updateTodo = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todoId ? { ...t, ticketName } : t
      )
    );
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={ticketName}
        onChangeText={setTicketName}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
          marginBottom: 12,
        }}
      />
      <Button title="Update Task" onPress={updateTodo} />
    </View>
  );
};

export default EditTodoScreen;
