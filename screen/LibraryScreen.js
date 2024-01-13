import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Ionicons from "react-native-vector-icons/Ionicons";
import TermCard from "../component/TermCard";
import FolderCard from '../component/FolderCard';
const FirstRoute = () => (
  <View >
    <TextInput style={styles.textInput}></TextInput>
    <View style={styles.line}></View>

    <Text style={styles.textItem1}> Filter term</Text>

    <Text style={styles.textItem2}> Today</Text>

    <ScrollView >
      <FlatList style={styles.first}
        data={[...Array(2)]}
        renderItem={({ item }) => <TermCard />}
      />
    </ScrollView>

  </View>

);

const SecondRoute = () => (
  <View >
    <ScrollView>
      <FlatList style={styles.second}
        data={[...Array(2)]}
        renderItem={({ item }) => <FolderCard />}
      />
    </ScrollView>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white', height: 1 }}
    style={{ backgroundColor: "#0A092B" }} // Màu sắc của TabBar
    labelStyle={{ color: 'white' }} // Màu sắc của văn bản tab
  />
);
const LibraryScreen = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <View style={{ flex: 1, backgroundColor: "#0A092B" }}>
      <View style={styles.header}>
        <Text style={styles.boldText}> Library</Text>
        <Ionicons name="add" color="#CACEE4" size={22} />
      </View>

      <TabView
        navigationState={{ index, routes: [{ key: 'first', title: 'term' }, { key: 'second', title: 'folder' }] }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => setIndex(newIndex)}
        renderTabBar={renderTabBar}
      />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    color: "#ffffff",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: "fixed",
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 10,
    flexDirection: "row",
    justifyContent: 'center',
  },
  boldText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 150,
    marginTop: 10,
  },
  Text: {
    flexDirection: "row",
    padding: 20,
  },
  line: {
    borderBottomColor: '#fff', // Màu sắc của đường kẻ
    borderBottomWidth: 3, // Độ dày của đường kẻ
    width: '100%', // Chiều rộng của đường kẻ (có thể điều chỉnh)
    marginVertical: 10,
    // marginTop: '10%'
  },
  textItem1: {
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 5,
  },
  textItem2: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 8,
    marginLeft: 25,
  },
  first: {
    marginLeft: 25,
  },
  second: {
    marginLeft: 30,
    marginTop: 30,
  },
  textInput: {
    borderWidth: 0.2,
    padding: 11,
  },

});
export default LibraryScreen;
