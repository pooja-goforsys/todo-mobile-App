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

const homeIcon = require("../assets/home.png");
const userIcon = require("../assets/user.png");
const settingsIcon = require("../assets/settings.png");
const defaultAvatar = require("../assets/user.png");

const CustomDrawerContent = (props) => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    profileImage: null,
  });


  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (!data) {
        setProfile({
          fullName: "",
          email: "",
          profileImage: null,
        });
        return;
      }

      const parsed = JSON.parse(data);

      setProfile({
        fullName: parsed.fullName || "",
        email: parsed.email || "",
        profileImage: parsed.profileImage || null,
      });
    } catch (error) {
      console.log("Drawer profile load error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );


  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={
            profile.profileImage
              ? { uri: profile.profileImage }
              : defaultAvatar
          }
          style={styles.avatar}
          resizeMode="cover"
        />

        <Text style={styles.name}>
          {profile.fullName || "Guest User"}
        </Text>

        <Text style={styles.email}>
          {profile.email || "guest@email.com"}
        </Text>
      </View>

      <DrawerItem
        label="Home"
        icon={homeIcon}
        onPress={() => {
          props.navigation.navigate("Home");
          props.navigation.closeDrawer();
        }}
      />

      <DrawerItem
        label="Profile"
        icon={userIcon}
        onPress={() => {
          props.navigation.navigate("Profile");
          props.navigation.closeDrawer();
        }}
      />

      <DrawerItem
        label="Settings"
        icon={settingsIcon}
        onPress={() => {
          props.navigation.navigate("Settings");
          props.navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;


const DrawerItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image source={icon} style={styles.icon} resizeMode="contain" />
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);


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
