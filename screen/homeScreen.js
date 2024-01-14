import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import HeaderHome from "../component/HeaderHome";
import FolderCard from "../component/FolderCard";
import TermCard from "../component/TermCard";
import { useState, useRef } from "react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
const { width: screenWidth } = Dimensions.get("window");
import { addTerm } from "../redux/actions/Term.action";

const HomeScreen = () => {
  // const test = async () => {
  //   console.log('sdhfghdsgfhdgs')
  //   const querySnapshot = await getDocs(
  //     collection(db, "cities", "SF", "landmarks")
  //   );
  //   console.log(querySnapshot)
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
      
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 100) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
  };

  const flatListRef = useRef(null);
  const handleScrollNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#0A092B" }}>
      <View style={styles.header_container}>
        <HeaderHome isHeaderVisible={isHeaderVisible} />
      </View>
      <ScrollView
        style={styles.body_container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.term_title}>
          <Text style={styles.text}>Recent studies</Text>
          <Text style={[styles.text, { color: "#B0B4F3" }]}>See all</Text>
        </View>
        <FlatList
          data={[...Array(20)]}
          renderItem={({ item }) => <TermCard />}
          onScroll={handleScrollNext}
          keyExtractor={(item) => item}
          horizontal={true}
        />
        <View style={[styles.term_title, { marginTop: 30 }]}>
          <Text style={styles.text}>Term</Text>
          <Text style={[styles.text, { color: "#B0B4F3" }]}>See all</Text>
        </View>
        <FlatList
          data={[...Array(20)]}
          renderItem={({ item }) => <TermCard />}
          onScroll={handleScrollNext}
          keyExtractor={(item) => item}
          horizontal={true}
        />
        <View style={[styles.term_title, { marginTop: 30 }]}>
          <Text style={styles.text}>Folder</Text>
          <Text style={[styles.text, { color: "#B0B4F3" }]}>See all</Text>
        </View>
        <ScrollView
          horizontal={true}
          style={styles.term_cards}
          showsHorizontalScrollIndicator={false}
        >
          {[...Array(20)].map(() => (
            <FolderCard />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    backgroundColor: "#313853",
    borderBottomLeftRadius: wp("40%"), // Adjust the percentage as needed
    borderBottomRightRadius: wp("40%"), // Adjust the percentage as needed
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  body_container: {},
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  term_title: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: wp("5%"), // Adjust the percentage as needed
    marginLeft: wp("5%"), // Adjust the percentage as needed
    marginBottom: hp("1%"), // Adjust the percentage as needed
  },
  term_cards: {
    flexDirection: "row",
  },
});

export default HomeScreen;
