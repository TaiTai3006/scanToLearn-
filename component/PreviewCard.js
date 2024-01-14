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
import { connect } from 'react-redux';

// const windowWidth = Dimensions.get("window").width;
const PreviewCard = ({ onPress, courses  }) => {
  return (
    <View>

      
      <TouchableOpacity onPress={onPress} style={styles.preview_card}>
        {courses.images.map((uri, index) => (
          <View key={index} style={styles.imagePreviewContainer}>
            <Image source={{ uri }} style={styles.image} />
          </View>
        ))}
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
    flexDirection:"row"
  },
  card_container: {
    // height: 120,
  },
  preview_logo: {
    maxHeight: 140,
    maxWidth: 100,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  image:{
    width: 100,
    height : 140,
    margin: 10,
  },
  imagePreviewContainer:{
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center",
  }
});
const mapStateToProps = (state) => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(PreviewCard);

