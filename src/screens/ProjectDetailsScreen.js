import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TodoItem from "../components/TodoItem";
import { isOverdue, formatDate } from "../utils/dateUtils";

const ProjectDetailsScreen = ({ route, todos, setTodos }) => {
  const { projectName } = route.params;

  const projectTasks = todos.filter(
    (t) => t.projectName === projectName
  );

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{projectName}</Text>

      <FlatList
        data={projectTasks}
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
          <Text style={styles.empty}>No tasks in this project</Text>
        }
      />
    </View>
  );
};

export default ProjectDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  empty: { textAlign: "center", marginTop: 30, color: "#777" },
});
