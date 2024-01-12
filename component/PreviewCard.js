import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Chip } from "react-native-paper";
// const windowWidth = Dimensions.get("window").width;
const PreviewCard = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.preview_card}>
        <View style={styles.card_container}>
            
          <Image
            style={styles.preview_logo}
            source={require('../assets/images/paper.jpg')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  preview_card: {
    height: 140,
    marginLeft: 5,
    marginTop: 10,
    padding: 2,
    marginBottom: 10,
  },
  card_container: {
    // height: 120,
  },
  preview_logo:{
    maxHeight: 140,
    maxWidth: 100,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
 
});

export default PreviewCard;