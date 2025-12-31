import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLEAR_KEYS = [
  "USER_PROFILE",
  "SAVED_TODOS",
  "ATTENDANCE_TODAY",
];

const SETTINGS_KEY = "APP_SETTINGS";

const SettingsScreen = ({ setIsLoggedIn }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [autoDelete, setAutoDelete] = useState(true);
  const [overdueAlert, setOverdueAlert] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      if (data) {
        const s = JSON.parse(data);
        setDarkMode(s.darkMode);
        setNotifications(s.notifications);
        setShowCompleted(s.showCompleted);
        setAutoDelete(s.autoDelete);
        setOverdueAlert(s.overdueAlert);
      }
    } catch (e) {
      console.log("Failed to load settings", e);
    }
  };

  useEffect(() => {
    saveSettings();
  }, [darkMode, notifications, showCompleted, autoDelete, overdueAlert]);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          darkMode,
          notifications,
          showCompleted,
          autoDelete,
          overdueAlert,
        })
      );
    } catch (e) {
      console.log("Failed to save settings", e);
    }
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove([
            ...CLEAR_KEYS,
            SETTINGS_KEY,
          ]);
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Section title="General">
        <SettingRow label="Dark Mode" value={darkMode} onChange={setDarkMode} />
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

      <Section title="App Info">
        <Text style={styles.infoText}>Version: 1.0.0</Text>

        <ActionButton
          text="Logout"
          danger
          onPress={confirmLogout}
        />
      </Section>
    </ScrollView>
  );
};

export default SettingsScreen;


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
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.buttonText, danger && styles.dangerText]}>
      {text}
    </Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  section: { backgroundColor: "#fff", margin: 12, padding: 15, borderRadius: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  label: { fontSize: 14 },
  buttonText: { color: "#1976d2", fontWeight: "600", paddingVertical: 12 },
  dangerText: { color: "#d32f2f" },
  infoText: { fontSize: 13, color: "#666" },
});
