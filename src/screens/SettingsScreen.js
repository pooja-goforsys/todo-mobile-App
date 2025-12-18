import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [autoDelete, setAutoDelete] = useState(false);
  const [overdueAlert, setOverdueAlert] = useState(true);

  const confirmAction = (title, message) => {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm", style: "destructive" },
    ]);
  };

  return (
    <ScrollView style={styles.container}>

      <Section title="General">
        <SettingRow
          label="Dark Mode"
          value={darkMode}
          onChange={setDarkMode}
        />
        <SettingRow
          label="Notifications"
          value={notifications}
          onChange={setNotifications}
        />
      </Section>

    
      <Section title="Todo Settings">
        <SettingRow
          label="Show Completed Tasks"
          value={showCompleted}
          onChange={setShowCompleted}
        />
        <SettingRow
          label="Auto Delete Completed"
          value={autoDelete}
          onChange={setAutoDelete}
        />
        <SettingRow
          label="Overdue Task Alert"
          value={overdueAlert}
          onChange={setOverdueAlert}
        />
      </Section>

      <Section title="Data">
        <ActionButton
          text="Clear All Todos"
          onPress={() =>
            confirmAction(
              "Clear Todos",
              "Are you sure you want to delete all todos?"
            )
          }
        />
        <ActionButton
          text="Reset App"
          danger
          onPress={() =>
            confirmAction(
              "Reset App",
              "This will reset the app completely."
            )
          }
        />
      </Section>

      <Section title="App Info">
        <Text style={styles.infoText}>Version: 1.0.0</Text>
        <ActionButton
          text="Logout"
          danger
          onPress={() => confirmAction("Logout", "Do you want to logout?")}
        />
      </Section>
    </ScrollView>
  );
};


const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const SettingRow = ({ label, value, onChange }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch value={value} onValueChange={onChange} />
  </View>
);

const ActionButton = ({ text, onPress, danger }) => (
  <TouchableOpacity
    style={[styles.button, danger && styles.dangerButton]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, danger && styles.dangerText]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
  section: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 14,
    color: "#1976d2",
    fontWeight: "600",
  },
  dangerButton: {},
  dangerText: {
    color: "#d32f2f",
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },
});
