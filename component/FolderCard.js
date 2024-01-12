import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const FolderCard = () => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    // Navigate to the PreviewScreen when the card is pressed
    console.log('Navigation Object:', navigation);
    navigation.navigate('PreviewScreen');
  };

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <View style={styles.title}>
          <Ionicons
            style={{ marginRight: 10 }}
            color="#4B526C"
            size={25}
            name="folder-outline"
          />
          <Text style={styles.text}>21 hoc phan</Text>
        </View>
        <View style={{ flexDirection: 'column', height: windowWidth * 0.25, justifyContent:'center' }}>
          <View>
            <Text
              style={[
                styles.text,
                { fontWeight: "700", fontSize: 25, marginRight: 10 },
              ]}
            >
             kanji
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: windowWidth * 0.4,
    width: windowWidth * 0.8,
    marginLeft: 15,
    borderColor: "#4B526C",
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "",
    padding: 15,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FolderCard;
