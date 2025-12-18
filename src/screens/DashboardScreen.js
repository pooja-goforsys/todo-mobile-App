import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.text}>Overview & stats will appear here</Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 22, fontWeight: "bold" },
  text: { color: "#666", marginTop: 8 },
});
