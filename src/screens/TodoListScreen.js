import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TodoListScreen = ({ navigation, todos, setTodos }) => {
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const grouped = todos.reduce((acc, item) => {
    acc[item.projectName] = acc[item.projectName] || [];
    acc[item.projectName].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddTodo")}
      >
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>

      {Object.keys(grouped).length === 0 && (
        <Text style={styles.empty}>No tasks yet</Text>
      )}

      <FlatList
        data={Object.keys(grouped)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.projectCard}>
            <Text style={styles.projectTitle}>{item}</Text>

            {grouped[item].map((task) => (
              <View key={task.id} style={styles.taskRow}>
                <Text style={styles.taskText}>{task.ticketName}</Text>

                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditTodo", {
                        todoId: task.id,
                      })
                    }
                  >
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteTodo(task.id)}>
                    <Text style={styles.delete}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addBtn: {
    backgroundColor: "#1976d2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  addText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  empty: { textAlign: "center", marginTop: 40, color: "#777" },
  projectCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  projectTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  taskText: { fontSize: 14 },
  actions: { flexDirection: "row", gap: 15 },
  edit: { color: "#1976d2" },
  delete: { color: "red" },
});
