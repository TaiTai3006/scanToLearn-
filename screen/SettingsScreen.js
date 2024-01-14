// SettingsScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const toggleNotification = () => {
    setNotificationEnabled((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header_container}>
        <Ionicons
          style={[styles.icon, { color: "#ffffff" }]}
          name="arrow-back"
          size={25}
        />

        <Text style={styles.title}>Setting</Text>
        
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language</Text>
        <Ionicons
          style={[styles.icon, { color: "#ffffff" }]}
          name="chevron-forward"
          size={25}
        />
      </View>
      <View style={styles.settingItem}>
      <Text style={styles.settingLabel}>Language</Text>
        <Ionicons
          style={[styles.icon, { color: "#ffffff" }]}
          name="chevron-forward"
          size={25}
        />
      </View>
      <View style={styles.settingItem}>
      <Text style={styles.settingLabel}>Language</Text>
        <Ionicons
          style={[styles.icon, { color: "#ffffff" }]}
          name="chevron-forward"
          size={25}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={toggleNotification}
          trackColor={{ false: "#fff", true: "#4255FF" }}
          thumbColor={notificationEnabled ? "#fff" : "#fff"}
          ios_backgroundColor="#4B5673"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0A092B",
  },
  header_container: {
    color: "#ffffff",
    borderBottomColor: "#4B5673",
    borderBottomWidth: 4,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingBottom: 10,
    paddingHorizontal: 5,
    // justifyContent: "space-between",
    flexDirection: "row",
  },
  icon: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    marginLeft: wp("27%"),
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#4B5673",
    paddingVertical: 16,
    marginVertical: 10,
  },
  settingLabel: {
    fontSize: 18,
    color: "#fff",
    fontWeight : 800
  },
});

export default SettingsScreen;
