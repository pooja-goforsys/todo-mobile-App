import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { getTodayAttendance } from "../utils/attendanceStorage";

const STORAGE_KEY = "USER_PROFILE";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    profileImage: null,

    employeeId: "",
    designation: "",
    department: "",

    gender: "",
    address: "",

    checkInTime: "--",
    checkOutTime: "--",
    productivityHours: "--",
    workStatus: "Not Started",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setProfile(JSON.parse(data));
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Load profile error:", error);
    }
  };

  const formatTime = (iso) => {
    if (!iso) return "--";
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateProductiveTime = (attendance) => {
    if (!attendance?.checkIn || !attendance?.checkOut) return "--";

    const checkIn = new Date(attendance.checkIn);
    const checkOut = new Date(attendance.checkOut);

    let totalMs = checkOut - checkIn;
    let breakMs = 0;

    attendance.breaks?.forEach((b) => {
      if (b.start && b.end) {
        breakMs += new Date(b.end) - new Date(b.start);
      }
    });

    const productiveMs = totalMs - breakMs;
    const totalMinutes = Math.floor(productiveMs / 60000);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const loadAttendance = async () => {
    const attendance = await getTodayAttendance();
    if (!attendance) return;

    setProfile((prev) => ({
      ...prev,
      checkInTime: formatTime(attendance.checkIn),
      checkOutTime: formatTime(attendance.checkOut),
      productivityHours: calculateProductiveTime(attendance),
      workStatus:
        attendance.status === "ON_WORK"
          ? "On Work"
          : attendance.status === "ON_BREAK"
          ? "On Break"
          : attendance.status === "CHECKED_OUT"
          ? "Checked Out"
          : "Not Started",
    }));
  };

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = () => {
    Alert.alert("Profile Photo", "Choose option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = () => {
    launchCamera({ mediaType: "photo", quality: 0.8 }, handleImage);
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.8 }, handleImage);
  };

  const handleImage = (res) => {
    if (res.didCancel || res.errorCode) return;
    setProfile((prev) => ({
      ...prev,
      profileImage: res.assets[0].uri,
    }));
  };

  const handleSave = async () => {
    if (!profile.fullName || !profile.email || !profile.phone) {
      Alert.alert("Required Fields", "Name, Email & Phone are mandatory");
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch {
      Alert.alert("Error", "Failed to save profile");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <View style={styles.outerRing}>
              <View style={styles.innerRing}>
                {profile.profileImage ? (
                  <Image
                    source={{ uri: profile.profileImage }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Text style={styles.avatarIcon}>👤</Text>
                )}
              </View>
            </View>
            <View style={styles.editBadge}>
              <Text style={styles.editIcon}>✎</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.nameText}>{profile.fullName || "Employee"}</Text>
        <Text style={styles.roleText}>
          {profile.designation || "Team Member"}
        </Text>

        <View style={styles.productivityCard}>
          <Text style={styles.sectionTitle}>Employment Summary</Text>

          <View style={styles.productivityRow}>
            <SummaryItem label="Check In" value={profile.checkInTime} />
            <SummaryItem label="Check Out" value={profile.checkOutTime} />
          </View>

          <View style={styles.productivityRow}>
            <SummaryItem
              label="Productive Time"
              value={profile.productivityHours}
            />
            <SummaryItem label="Status" value={profile.workStatus} />
          </View>
        </View>

        {isEditing ? (
          <View style={styles.card}>
            <Section title="Basic Information">
              <Input
                placeholder="Full Name *"
                value={profile.fullName}
                onChangeText={(v) => handleChange("fullName", v)}
              />
              <Input
                placeholder="Email *"
                keyboardType="email-address"
                autoCapitalize="none"
                value={profile.email}
                onChangeText={(v) => handleChange("email", v)}
              />
              <Input
                placeholder="Mobile Number *"
                keyboardType="phone-pad"
                value={profile.phone}
                onChangeText={(v) => handleChange("phone", v)}
              />
            </Section>

            <Section title="Employee Details">
              <Input
                placeholder="Employee ID"
                value={profile.employeeId}
                onChangeText={(v) => handleChange("employeeId", v)}
              />
              <Input
                placeholder="Designation"
                value={profile.designation}
                onChangeText={(v) => handleChange("designation", v)}
              />
              <Input
                placeholder="Department"
                value={profile.department}
                onChangeText={(v) => handleChange("department", v)}
              />
            </Section>

            <Section title="Personal Information">
              <Input
                placeholder="Gender"
                value={profile.gender}
                onChangeText={(v) => handleChange("gender", v)}
              />
              <Input
                placeholder="Address"
                multiline
                style={{ height: 80 }}
                value={profile.address}
                onChangeText={(v) => handleChange("address", v)}
              />
            </Section>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <ProfileItem label="Employee ID" value={profile.employeeId} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Phone" value={profile.phone} />
            <ProfileItem label="Department" value={profile.department} />
            <ProfileItem label="Gender" value={profile.gender} />
            <ProfileItem label="Address" value={profile.address} />

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;


const Section = ({ title, children }) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.sectionHeader}>{title}</Text>
    {children}
  </View>
);

const Input = (props) => (
  <TextInput
    {...props}
    style={[styles.input, props.style]}
    placeholderTextColor="#999"
  />
);

const ProfileItem = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);

const SummaryItem = ({ label, value }) => (
  <View style={styles.summaryBox}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f6f8",
    flexGrow: 1,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  outerRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#1976d2",
    justifyContent: "center",
    alignItems: "center",
  },
  innerRing: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  avatarIcon: {
    fontSize: 46,
    color: "#bbb",
  },
  editBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "#1976d2",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  editIcon: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  nameText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  roleText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },

  productivityCard: {
    backgroundColor: "#e3f2fd",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  productivityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  summaryBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
    color: "#1976d2",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1976d2",
  },
  input: {
    backgroundColor: "#fafafa",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 10,
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: "#1976d2",
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  row: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  editBtn: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  editText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#1976d2",
  },
});
