import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "USER_PROFILE";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setProfile(JSON.parse(data));
        setIsEditing(false);
      }
    } catch (e) {
      console.log("Load profile error", e);
    }
  };

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleSave = async () => {
    if (!profile.name || !profile.phone || !profile.email) {
      Alert.alert(
        "Required Fields",
        "Name, Phone and Email are mandatory"
      );
      return;
    }

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profile)
      );
      setIsEditing(false);
    } catch (e) {
      Alert.alert("Error", "Failed to save profile");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {isEditing ? (
        <>
          <Text style={styles.title}>Edit Profile</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={profile.name}
            onChangeText={(v) => handleChange("name", v)}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile Number *"
            keyboardType="phone-pad"
            value={profile.phone}
            onChangeText={(v) => handleChange("phone", v)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address *"
            keyboardType="email-address"
            value={profile.email}
            onChangeText={(v) => handleChange("email", v)}
          />

          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={profile.gender}
            onChangeText={(v) => handleChange("gender", v)}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Address"
            multiline
            value={profile.address}
            onChangeText={(v) => handleChange("address", v)}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>My Profile</Text>

          <View style={styles.card}>
            <ProfileItem label="Name" value={profile.name} />
            <ProfileItem label="Phone" value={profile.phone} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Gender" value={profile.gender} />
            <ProfileItem label="Address" value={profile.address} />

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const ProfileItem = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: "#1976d2",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#777",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  editBtn: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  editText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#1976d2",
  },
});
