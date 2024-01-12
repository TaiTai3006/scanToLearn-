import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import { Avatar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Chip } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("height").height
const TermCard = () => {
  return (
    <View>
      <TouchableOpacity style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://meetingtomorrow.com/wp-content/uploads/2019/08/TextDocument.png",
            }}
          />

          <View>
            <Text style={styles.text}>NIJ Unit 1 Lecture 漢字</Text>
            <View style={[styles.chip_container]}>
              <Chip
                style={[styles.chip_border, { marginRight: 5 }]}
                textStyle={styles.chip_text}
              >
                21 Terms
              </Chip>
            </View>
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
    justifyContent: "space-between",
    padding: 15,
  },
  card_container: {
    margin: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 10,
  },
  chip_container: {
    flexDirection: "row",
  },
  chip_text: {
    color: "#CACEE4",
    fontSize: 10,
    fontWeight: "800",
  },
  chip_border: {
    backgroundColor: "#303855",
    borderRadius: 30,
  },
  tinyLogo: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.32,
  },
});

export default TermCard;
