import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@clerk/clerk-expo";
import {useNavigation} from '@react-navigation/native';

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = useNavigation();
  if (!isOpen) {
    return null;
  }

  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          signOut().then(() => {
            navigation.navigate('Tabs')
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.sidebarContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <AntDesign name="menu-unfold" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={handleLogout}>
          <Text style={styles.linkText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  content: {
    marginTop: 20,
  },
  link: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  linkText: {
    fontSize: 16,
  },
});

export default Sidebar;
