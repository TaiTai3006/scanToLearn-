import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Avatar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Chip } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
const FolderCard = () => {
  return (
    <View>
      <TouchableOpacity style={styles.card}>
        <View style={styles.title}>
          <Ionicons
            style={{ marginRight: 10 }}
            color="#4B526C"
            size={25}
            name="folder-outline"
          />
          <Text style={styles.text}>21 hoc phan</Text>
        </View>
        <View style={{ flexDirection: 'column', height: windowWidth * 0.25, justifyContent:'center' }}>
          <View>
            <Text
              style={[
                styles.text,
                { fontWeight: "700", fontSize: 25, marginRight: 10 },
              ]}
            >
             kanji
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    height: windowWidth * 0.4,
    width: windowWidth * 0.8,
    marginLeft: 15,
    borderColor: "#4B526C",
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "",
    padding: 15,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FolderCard;
