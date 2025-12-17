import React from "react";
import { View, FlatList, Button, Text } from "react-native";
import TodoItem from "../components/TodoItem";
import { globalStyles } from "../styles/globalStyles";
import { isOverdue, formatDate } from "../utils/dateUtils";

const TodoListScreen = ({ navigation, todos, setTodos }) => {
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <View style={globalStyles.container}>
      <Button title="Add Todo" onPress={() => navigation.navigate("AddTodo")} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            overdue={isOverdue(item.dueDate)}
            createdAt={formatDate(item.createdAt)}
            onEdit={() =>
              navigation.navigate("EditTodo", { todoId: item.id })
            }
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        ListEmptyComponent={<Text>No Todos Found</Text>}
      />
    </View>
  );
};

export default TodoListScreen;
