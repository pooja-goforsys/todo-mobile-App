import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DashboardScreen = ({ todos = [] }) => {
  const safeTodos = Array.isArray(todos) ? todos : [];

  const totalTasks = safeTodos.length;
  const projects = new Set(
    safeTodos.map((t) => t.projectName)
  ).size;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.stat}>Projects: {projects}</Text>
      <Text style={styles.stat}>Total Tasks: {totalTasks}</Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  stat: {
    fontSize: 16,
    marginBottom: 8,
  },
});
