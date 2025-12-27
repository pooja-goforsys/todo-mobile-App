import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.text}>Screen Not Found</Text>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
});
