import React from "react";
import { Text, StyleSheet } from "react-native";

const InlineError = ({ message }) => {
  if (!message) return null;

  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});

export default InlineError;
