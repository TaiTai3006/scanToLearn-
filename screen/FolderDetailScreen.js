import { View, SafeAreaView, Text, StyleSheet, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "@rneui/themed";
import TermCard from "../component/TermCard";
const FolderDetailScreen = () => {
  return (
    <View style={{ backgroundColor: "#0A092D", flex: 1 }}>
      <SafeAreaView style={{ marginLeft: 20, marginRight: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Ionicons color="#fff" size={30} name="arrow-back-outline" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              color="#fff"
              size={30}
              name="add-outline"
              style={{ marginRight: 20 }}
            />
            <Ionicons color="#fff" size={30} name="ellipsis-horizontal-sharp" />
          </View>
        </View>
        <View>
          <Text style={[styles.text, { marginTop: 50 }]}>huhu</Text>
          <Text style={{ fontSize: 15, color: "#fff", marginTop: 15, marginBottom: 40 }}>
            0 terms
          </Text>
        </View>
        
        {[...Array(1)].length == 0 ?
        <View style={styles.card}>
          <Text style={[styles.text, { fontSize: 16, textAlign: "center" }]}>
            This folder haven't the terms
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
              marginTop: 15,
              textAlign: "center",
            }}
          >
            Add sets to this folder for organization stack them.
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              style={{ marginTop: 20 }}
              titleStyle={{ fontSize: 15 }}
              buttonStyle={{ backgroundColor: "#A8B1FF" }}
            >
              Add term
            </Button>
          </View>
        </View> :
         <FlatList
         data={[...Array(10)]}
         renderItem={({ item }) => <TermCard  folderType={true}/>}
         keyExtractor={item => item}
         
       />}
      </SafeAreaView>
    </View>
  );
};

export default FolderDetailScreen;
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  card: {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#586380",
  },
});
