// PreviewScreen.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";

import PreviewCard from "../component/PreviewCard";
import VideoCard from "../component/VideoCard";
import RelatedCard from "../component/RelatedCard";
import { Chip } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
const PreviewScreen = ({ courses }) => {
  console.log(courses.title)
 
  const navigation = useNavigation();
  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

      
    


  const [currentPage, setCurrentPage] = useState(0);
  const handleScrollNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0A092B" }}>
     
      {/* <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            style={[styles.icon, { color: "#ffffff" }]}
            name="arrow-back"
            size={25}
          />
        </TouchableOpacity>
      <Text style={styles.text}>Display Page</Text>
      <Text style={styles.text}> {courses.title}</Text> */}
     
     
     
    
      <View style={styles.header_container}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            style={[styles.icon, { color: "#ffffff" }]}
            name="arrow-back"
            size={25}
          />
        </TouchableOpacity>

        <Text style={styles.text}>Preview</Text>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="ellipsis-horizontal" color="#CACEE4" size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.body_container}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          style={{ marginLeft: 5 }}
          data={[...Array(1)]}
          renderItem={({ item }) => <PreviewCard />}
          pagingEnabled={true}
          onScroll={handleScrollNext}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />

        <View style={[styles.chip_container]}>
        {/* <Text style={styles.text_title}> {courses.title}</Text> */}
          <Text style={styles.text_title}>{`Tên học phần ${courses.title}`}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("TestScreen")}>
            <Chip
              icon={() => (
                <Ionicons name="document" color="#CACEE4" size={18} />
              )}
              style={[styles.chip_border, { marginBottom: 10 }]}
              textStyle={styles.chip_text}
            >
              Tóm tắt
            </Chip>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("QuestionSelectionScreen")}
          >
            <Chip
              icon={() => <Ionicons name="book" color="#CACEE4" size={18} />}
              style={[styles.chip_border]}
              textStyle={styles.chip_text}
            >
              Luyện tập
            </Chip>
          </TouchableOpacity>
        </View>
        <View style={styles.card_header}>
          <Text style={styles.text_title}>Video</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("YourScreenName")}
          >
            <Text style={[styles.text_title, { color: "#B0B4F3" }]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[...Array(20)]}
          renderItem={({ item }) => <VideoCard />}
          pagingEnabled={true}
          onScroll={handleScrollNext}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
        <View style={styles.card_header}>
          <Text style={styles.text_title}>Related</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("YourScreenName")}
          >
            <Text style={[styles.text_title, { color: "#B0B4F3" }]}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[...Array(20)]}
          renderItem={({ item }) => <RelatedCard />}
          pagingEnabled={true}
          onScroll={handleScrollNext}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </ScrollView>
      <Text>This is the Preview Screen</Text>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header_container: {
    color: "#ffffff",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: "fixed",
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  text_title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
  },
  card_header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: wp("5%"), // Adjust the percentage as needed
    marginLeft: wp("5%"), // Adjust the percentage as needed
    // marginBottom: hp("1%"),
    marginTop: hp("3%"),
  },

  body_container: {
    height: 120,
  },
  chip_container: {
    flexDirection: "column",
    marginTop: 5,
    padding: 10,
  },
  chip_text: {
    color: "#CACEE4",
    fontSize: 15,
    fontWeight: "800",
    padding: 8,
  },
  chip_border: {
    backgroundColor: "#303855",
    borderRadius: 10,
  },
  
});
const mapStateToProps = (state) => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(PreviewScreen);
