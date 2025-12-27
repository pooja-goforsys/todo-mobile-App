import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "USER_PROFILE";

const homeIcon = require("../assests/home.png");
const userIcon = require("../assests/user.png");
const settingsIcon = require("../assests/settings.png");

const CustomDrawerContent = (props) => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    profileImage: null,
  });

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);

        setProfile({
          fullName: parsed.fullName || "",
          email: parsed.email || "",
          profileImage: parsed.profileImage || null,
        });
      } else {
        setProfile({
          fullName: "",
          email: "",
          profileImage: null,
        });
      }
    } catch (error) {
      console.log("Drawer profile load error:", error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        {profile.profileImage ? (
          <Image
            source={{ uri: profile.profileImage }}
            style={styles.avatar}
          />
        ) : (
          <Image
            source={require("../assests/user.png")}
            style={styles.avatar}
          />
        )}

        <Text style={styles.name}>
          {profile.fullName || "Guest User"}
        </Text>

        <Text style={styles.email}>
          {profile.email || "guest@email.com"}
        </Text>
      </View>

      {/* 🔹 DRAWER ITEMS */}
      <DrawerItem
        label="Home"
        icon={homeIcon}
        onPress={() => props.navigation.navigate("Home")}
      />

      <DrawerItem
        label="Profile"
        icon={userIcon}
        onPress={() => props.navigation.navigate("Profile")}
      />

      <DrawerItem
        label="Settings"
        icon={settingsIcon}
        onPress={() => props.navigation.navigate("Settings")}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

/* ================= DRAWER ITEM ================= */

const DrawerItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  email: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
