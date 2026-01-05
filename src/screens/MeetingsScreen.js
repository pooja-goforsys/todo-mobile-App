import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MEETINGS_KEY = "SAVED_MEETINGS";

const MeetingsScreen = () => {
  const [meetings, setMeetings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    people: "",
    note: "",
  });

  /* ================= LOAD / SAVE ================= */

  useEffect(() => {
    loadMeetings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(MEETINGS_KEY, JSON.stringify(meetings));
  }, [meetings]);

  const loadMeetings = async () => {
    const data = await AsyncStorage.getItem(MEETINGS_KEY);
    if (data) setMeetings(JSON.parse(data));
  };

  /* ================= ACTIONS ================= */

  const createMeeting = () => {
    if (!form.title || !form.date || !form.time) {
      Alert.alert("Required", "Title, Date & Time are required");
      return;
    }

    setMeetings((prev) => [
      ...prev,
      { id: Date.now().toString(), ...form },
    ]);

    setForm({ title: "", date: "", time: "", people: "", note: "" });
    setModalVisible(false);
  };

  /* ================= UI ================= */

  const renderMeeting = ({ item }) => (
    <View style={styles.meetingCard}>
      <Text style={styles.meetingTitle}>{item.title}</Text>
      <Text style={styles.meetingMeta}>
        📅 {item.date} | ⏰ {item.time}
      </Text>
      {item.people ? (
        <Text style={styles.people}>👥 {item.people}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meetings</Text>

      <FlatList
        data={meetings}
        keyExtractor={(item) => item.id}
        renderItem={renderMeeting}
        ListEmptyComponent={
          <Text style={styles.empty}>No meetings scheduled</Text>
        }
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>

      {/* ================= MODAL ================= */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Schedule Meeting</Text>

            <TextInput
              placeholder="Meeting Title"
              style={styles.input}
              value={form.title}
              onChangeText={(v) => setForm({ ...form, title: v })}
            />

            <TextInput
              placeholder="Date (e.g. 20 Sep 2026)"
              style={styles.input}
              value={form.date}
              onChangeText={(v) => setForm({ ...form, date: v })}
            />

            <TextInput
              placeholder="Time (e.g. 11:00 AM)"
              style={styles.input}
              value={form.time}
              onChangeText={(v) => setForm({ ...form, time: v })}
            />

            <TextInput
              placeholder="People to invite"
              style={styles.input}
              value={form.people}
              onChangeText={(v) => setForm({ ...form, people: v })}
            />

            <TextInput
              placeholder="Note (optional)"
              style={[styles.input, { height: 80 }]}
              multiline
              value={form.note}
              onChangeText={(v) => setForm({ ...form, note: v })}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createBtn}
                onPress={createMeeting}
              >
                <Text style={{ color: "#fff" }}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MeetingsScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f6f8" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 12 },

  meetingCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  meetingTitle: { fontSize: 16, fontWeight: "600" },
  meetingMeta: { color: "#555", marginTop: 4 },
  people: { color: "#777", marginTop: 4 },

  empty: { textAlign: "center", color: "#888", marginTop: 40 },

  addBtn: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4f46e5",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 28 },

  modalWrap: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 16,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelBtn: { padding: 10, marginRight: 8 },
  createBtn: {
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 8,
  },
});
