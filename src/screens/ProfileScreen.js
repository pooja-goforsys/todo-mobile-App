import React, { useEffect, useRef, useState } from "react";
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


const PROFILE_KEY = "USER_PROFILE";
const ATTENDANCE_KEY = "TODAY_ATTENDANCE";


const ProfileScreen = () => {
  const timerRef = useRef(null);

  const [isEditing, setIsEditing] = useState(true);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [seconds, setSeconds] = useState(0);

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
    loadAttendance();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem(PROFILE_KEY);
      if (data) {
        setProfile(JSON.parse(data));
        setIsEditing(false);
      }
    } catch (e) {
      console.log("Profile load error:", e);
    }
  };

  const loadAttendance = async () => {
    try {
      const data = await AsyncStorage.getItem(ATTENDANCE_KEY);
      if (!data) return;

      const attendance = JSON.parse(data);
      let diff = 0;

      if (attendance.checkIn && !attendance.checkOut) {
        diff = Math.floor(
          (Date.now() - new Date(attendance.checkIn).getTime()) / 1000
        );
        setSeconds(diff);
        setIsCheckedIn(true);
        startTimer();
      }

      setProfile((prev) => ({
        ...prev,
        checkInTime: formatTime(attendance.checkIn),
        checkOutTime: formatTime(attendance.checkOut),
        productivityHours: formatDuration(diff),
        workStatus: attendance.checkOut ? "Checked Out" : "On Work",
      }));
    } catch (e) {
      console.log("Attendance load error:", e);
    }
  };


  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatClock = () => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  const formatDuration = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const formatTime = (iso) =>
    iso
      ? new Date(iso).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";


  const handleCheckIn = async () => {
    const data = { checkIn: new Date().toISOString(), checkOut: null };
    await AsyncStorage.setItem(ATTENDANCE_KEY, JSON.stringify(data));

    setSeconds(0);
    setIsCheckedIn(true);
    startTimer();

    setProfile((p) => ({
      ...p,
      checkInTime: formatTime(data.checkIn),
      workStatus: "On Work",
    }));
  };

  const handleCheckOut = async () => {
    stopTimer();

    const data = await AsyncStorage.getItem(ATTENDANCE_KEY);
    if (!data) return;

    const attendance = JSON.parse(data);
    attendance.checkOut = new Date().toISOString();

    await AsyncStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));

    setIsCheckedIn(false);
    setProfile((p) => ({
      ...p,
      checkOutTime: formatTime(attendance.checkOut),
      productivityHours: formatDuration(seconds),
      workStatus: "Checked Out",
    }));
  };


  const handleChange = (key, value) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!profile.fullName || !profile.email || !profile.phone) {
      Alert.alert("Required", "Name, Email & Phone are mandatory");
      return;
    }
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setIsEditing(false);
  };

  const pickImage = () => {
    Alert.alert("Profile Photo", "Choose option", [
      { text: "Camera", onPress: () => launchCamera({ mediaType: "photo" }, onImage) },
      { text: "Gallery", onPress: () => launchImageLibrary({ mediaType: "photo" }, onImage) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const onImage = (res) => {
    if (res.didCancel || res.errorCode) return;
    setProfile((p) => ({ ...p, profileImage: res.assets[0].uri }));
  };


  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <TouchableOpacity onPress={pickImage} style={styles.avatarBox}>
          {profile.profileImage ? (
            <Image source={{ uri: profile.profileImage }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarIcon}>👤</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.name}>{profile.fullName || "Employee"}</Text>
        <Text style={styles.role}>{profile.designation || "Team Member"}</Text>

        <View style={styles.attendanceCard}>
          <Text style={styles.statusText}>{isCheckedIn ? "Remote In" : "Not Working"}</Text>

          <View style={styles.timerRow}>
            {formatClock().split(" : ").map((t, i) => (
              <View key={i} style={styles.timeCard}>
                <Text style={styles.timeText}>{t}</Text>
              </View>
            ))}
          </View>

          {!isCheckedIn ? (
            <TouchableOpacity style={styles.checkInBtn} onPress={handleCheckIn}>
              <Text style={styles.btnText}>Check-in</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.checkOutBtn} onPress={handleCheckOut}>
              <Text style={styles.btnText}>Check-out</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.summaryCard}>
          <Summary label="Employee ID" value={profile.employeeId} />
          <Summary label="Department" value={profile.department} />
          <Summary label="Check In" value={profile.checkInTime} />
          <Summary label="Check Out" value={profile.checkOutTime} />
          <Summary label="Productive Time" value={profile.productivityHours} />
          <Summary label="Status" value={profile.workStatus} />
        </View>

        {isEditing ? (
          <View style={styles.card}>
            <Input placeholder="Full Name" value={profile.fullName} onChangeText={(v) => handleChange("fullName", v)} />
            <Input placeholder="Email" value={profile.email} onChangeText={(v) => handleChange("email", v)} />
            <Input placeholder="Phone" value={profile.phone} onChangeText={(v) => handleChange("phone", v)} />
            <Input placeholder="Employee ID" value={profile.employeeId} onChangeText={(v) => handleChange("employeeId", v)} />
            <Input placeholder="Designation" value={profile.designation} onChangeText={(v) => handleChange("designation", v)} />
            <Input placeholder="Department" value={profile.department} onChangeText={(v) => handleChange("department", v)} />
            <Input placeholder="Gender" value={profile.gender} onChangeText={(v) => handleChange("gender", v)} />
            <Input placeholder="Address" value={profile.address} onChangeText={(v) => handleChange("address", v)} multiline />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;


const Input = (props) => <TextInput {...props} style={styles.input} />;

const Summary = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value || "-"}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f4f6f8" },
  avatarBox: { alignSelf: "center", marginBottom: 8 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  avatarIcon: { fontSize: 50 },
  name: { textAlign: "center", fontSize: 20, fontWeight: "700" },
  role: { textAlign: "center", color: "#666", marginBottom: 10 },

  attendanceCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
  },
  statusText: { color: "#16a34a", fontWeight: "700", marginBottom: 10 },
  timerRow: { flexDirection: "row", marginBottom: 12 },
  timeCard: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  timeText: { fontSize: 18, fontWeight: "700" },

  checkInBtn: { backgroundColor: "#16a34a", padding: 14, borderRadius: 10, width: "70%" },
  checkOutBtn: { backgroundColor: "#ef4444", padding: 14, borderRadius: 10, width: "70%" },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  summaryCard: { backgroundColor: "#e3f2fd", borderRadius: 14, padding: 14, marginBottom: 14 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  summaryLabel: { color: "#666" },
  summaryValue: { fontWeight: "700" },

  card: { backgroundColor: "#fff", borderRadius: 14, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginBottom: 8 },
  saveBtn: { backgroundColor: "#1976d2", padding: 14, borderRadius: 10 },
  editBtn: { backgroundColor: "#e3f2fd", padding: 12, borderRadius: 10 },
  editText: { textAlign: "center", color: "#1976d2", fontWeight: "600" },
});
