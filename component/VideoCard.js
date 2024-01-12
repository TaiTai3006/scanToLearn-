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
const windowWidth = Dimensions.get("window").width;
const VideoCard = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={styles.card_container}>
          <Image
            style={styles.video_image}
            source={require("../assets/images/hungvuong.jpg")}
          />
          <View  style={styles.video_description}>
           
            <Text style={styles.text}numberOfLines={4} ellipsizeMode="tail">
              Giỗ tổ Hùng Vương: Nguồn gốc, ý nghĩa ngày mùng 10 tháng 3
            </Text>
            <Image
              style={styles.ytb_logo}
              source={require("../assets/images/ytb.png")}
            />
            <Text style={styles.text_link}numberOfLines={3} ellipsizeMode="tail">
            https://www.youtube.com/watch?v=G3DPz4zGztQ
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
  },
  card_container: {
    margin: 2,
    height: windowWidth * 0.4,
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  video_image: {
    width: "60%",
    height: "100%",
    borderRadius: 5,
  },
  video_description: {
    
    margin: 5,
    width: "40%",
  },
  text:{
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
  ytb_logo:{
    width: 20,
    height: 20,
  },
  text_link:{
    fontSize: 10,
    color: "blue",
   
  }
});

export default VideoCard;