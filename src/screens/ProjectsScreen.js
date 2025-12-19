import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const ProjectsScreen = ({ navigation, todos }) => {
  const projects = Object.values(
    todos.reduce((acc, task) => {
      acc[task.projectName] = acc[task.projectName] || {
        name: task.projectName,
        count: 0,
      };
      acc[task.projectName].count += 1;
      return acc;
    }, {})
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Projects</Text>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProjectDetails", {
                projectName: item.name,
              })
            }
          >
            <Text style={styles.projectName}>{item.name}</Text>
            <Text style={styles.count}>{item.count} Tasks</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No projects yet</Text>
        }
      />
    </View>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  projectName: { fontSize: 16, fontWeight: "600" },
  count: { color: "#666", marginTop: 4 },
  empty: { textAlign: "center", marginTop: 40, color: "#777" },
});
