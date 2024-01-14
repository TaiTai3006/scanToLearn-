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
  const historicalData = [
    {
      id: '1',
      title: 'Lý Thái Tổ',
      description: 'Founder of the Lý Dynasty, which laid the foundation for an independent Vietnamese nation.',
      imageUrl: 'https://thuvienso.org/wp-content/uploads/2023/02/2020_05_26_16_38_35_3-390x510.jpg',
    },
    {
      id: '2',
      title: 'Trận Bạch Đằng',
      description: 'A significant Vietnamese military victory during the third Mongol invasion of Vietnam in 1288.',
      imageUrl: 'https://thuvienso.org/wp-content/uploads/2023/02/2021_07_01_13_55_59_2-390x510.jpg',
    },
    {
      id: '3',
      title: '2 Bà Trưng',
      description: 'National heroines who rebelled against Chinese rule in the year 40 AD.',
      imageUrl: 'https://online.pubhtml5.com/zqkcj/eqze/files/large/1.jpg?1650376602',
    },
    {
      id: '4',
      title: 'Nguyễn Huệ',
      description: 'Emperor Quang Trung, a national hero who led the Tây Sơn rebellion and defeated the Qing invaders.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Viet_Nam_Su_Luoc_2.pdf/page163-1024px-Viet_Nam_Su_Luoc_2.pdf.jpg',
    },
    {
      id: '5',
      title: 'Nguyễn Trãi',
      description: 'A prominent leader of the anti-French uprisings in Vietnam towards the end of the 19th century.',
      imageUrl: 'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nguyen_trai_toan_tap/2022_06_08_16_41_19_3-390x510.jpg',
    },
  ];
  const recentStudiesData = historicalData.slice(0, 4); 
  const termData = [
    historicalData[4], 
    ...historicalData.slice(0, 3) 
  ];
  const terms = [
    { title: 'Lịch sử nước Văn Lang' },
    { title: 'Trận chiến Bạch Đằng' },
    { title: 'Lịch sử cận đại' },
    { title: 'Lịch sử phong kiến' },
   
  ];
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
          data={recentStudiesData}
          renderItem={({ item }) => <TermCard term={item} />}
          onScroll={handleScrollNext}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
        <View style={[styles.term_title, { marginTop: 30 }]}>
          <Text style={styles.text}>Term</Text>
          <Text style={[styles.text, { color: "#B0B4F3" }]}>See all</Text>
        </View>
        <FlatList
          data={termData}
          renderItem={({ item }) => <TermCard term={item} />}
          onScroll={handleScrollNext}
          keyExtractor={(item) => item.id}
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
          {terms.map((term, index) => (
            <FolderCard key={index} title={term.title} />
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
