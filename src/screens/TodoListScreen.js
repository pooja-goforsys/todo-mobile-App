import React from "react";
import { View, FlatList, Button, Text } from "react-native";
import TodoItem from "../components/TodoItem";
import { isOverdue, formatDate } from "../utils/dateUtils";

const TodoListScreen = ({ navigation, todos, setTodos }) => {
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("AddTodo")}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            overdue={isOverdue(item.dueDate)}
            createdAt={formatDate(item.createdAt)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No Tasks Found
          </Text>
        }
      />
    </View>
  );
};

export default TodoListScreen;
