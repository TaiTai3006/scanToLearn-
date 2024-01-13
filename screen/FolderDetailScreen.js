import React from "react";
import { View, SafeAreaView, Text, StyleSheet, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "@rneui/themed";
import TermCard from "../component/TermCard";

const FolderDetailScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Ionicons color="#fff" size={30} name="arrow-back-outline" />
          </View>
          <View style={styles.headerIcons}>
            <Ionicons
              color="#fff"
              size={30}
              name="add-outline"
              style={styles.iconMargin}
            />
            <Ionicons color="#fff" size={30} name="ellipsis-horizontal-sharp" />
          </View>
        </View>
        <View>
          <Text style={[styles.text, styles.marginTop50]}>huhu</Text>
          <Text style={styles.infoText}>0 terms</Text>
        </View>

        {[...Array(1)].length === 0 ? (
          <View style={styles.card}>
            <Text style={[styles.text, styles.centerText, styles.fontSize16]}>
              This folder hasn't any terms
            </Text>
            <Text style={[styles.infoText, styles.centerText]}>
              Add sets to this folder for organization stack them.
            </Text>
            <View style={styles.centerRow}>
              <Button
                style={styles.buttonMarginTop}
                titleStyle={styles.buttonText}
                buttonStyle={styles.button}
              >
                Add term
              </Button>
            </View>
          </View>
        ) : (
          <FlatList
            data={[...Array(10)]}
            renderItem={({ item }) => <TermCard folderType={true} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
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
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconMargin: {
    marginRight: 20,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  marginTop50: {
    marginTop: 50,
  },
  infoText: {
    fontSize: 15,
    color: "#fff",
    marginTop: 15,
    marginBottom: 40,
  },
  card: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#586380",
  },
  centerText: {
    textAlign: "center",
  },
  fontSize16: {
    fontSize: 16,
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonMarginTop: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
  },
  button: {
    backgroundColor: "#A8B1FF",
  },
});

export default FolderDetailScreen;
