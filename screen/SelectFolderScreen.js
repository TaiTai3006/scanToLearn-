import React from "react";
import { View, SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import TermCard from "../component/TermCard";

const SelectFolderScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Done</Text>
          <Text style={styles.headerTextBold}>Choose terms</Text>
          <Text style={styles.headerText}>Done</Text>
        </View>
        <FlatList
          data={[...Array(10)]}
          renderItem={({ item }) => <TermCard folderType={true} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A092D",
    flex: 1,
  },
  safeArea: {
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    color: "#0A092D",
  },
  headerTextBold: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SelectFolderScreen;
