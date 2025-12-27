import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  ActivityIndicator,
} from "react-native";

import api from "../api/axios";
import InlineError from "../components/InlineError";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TodoListScreen = ({ navigation, todos, setTodos }) => {
  const [expandedProjects, setExpandedProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api
      .get("/todos")
      .then(() => {
        setErrorMsg("");
      })
      .catch((err) => {
        setErrorMsg(err.userMessage || "Something went wrong.");
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const grouped = todos.reduce((acc, item) => {
    acc[item.projectName] = acc[item.projectName] || [];
    acc[item.projectName].push(item);
    return acc;
  }, {});

  const toggleProject = (name) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedProjects((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subTitle}>{todos.length} Total Tasks</Text>

        <InlineError message={errorMsg} />
      </View>

      {Object.keys(grouped).length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No Tasks Yet</Text>
          <Text style={styles.emptyText}>
            Start by adding your first task
          </Text>
        </View>
      )}

      <FlatList
        data={Object.keys(grouped)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const tasks = grouped[item];
          const expanded = expandedProjects[item];

          return (
            <View style={styles.projectCard}>
              <TouchableOpacity
                style={styles.projectHeader}
                onPress={() => toggleProject(item)}
              >
                <Text style={styles.projectTitle}>{item}</Text>
                <View style={styles.projectMeta}>
                  <Text style={styles.count}>{tasks.length}</Text>
                  <Text style={styles.arrow}>
                    {expanded ? "▲" : "▼"}
                  </Text>
                </View>
              </TouchableOpacity>

              {expanded &&
                tasks.map((task) => (
                  <View key={task.id} style={styles.taskRow}>
                    <View>
                      <Text style={styles.taskText}>
                        {task.ticketName}
                      </Text>
                      <Text style={styles.status}>
                        Status: Pending
                      </Text>
                    </View>

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

                      <TouchableOpacity
                        onPress={() => deleteTodo(task.id)}
                      >
                        <Text style={styles.delete}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTodo")}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoListScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subTitle: {
    color: "#666",
    marginTop: 2,
  },

  emptyBox: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 6,
    color: "#777",
  },

  projectCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 2,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#e3f2fd",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  projectMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  count: {
    backgroundColor: "#1976d2",
    color: "#fff",
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
  },
  arrow: {
    fontSize: 12,
  },

  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  taskText: {
    fontSize: 15,
    fontWeight: "500",
  },
  status: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  edit: {
    color: "#1976d2",
    fontWeight: "600",
  },
  delete: {
    color: "#d32f2f",
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1976d2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 2,
  },
});
