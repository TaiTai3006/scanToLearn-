import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Input, Icon } from "@rneui/themed";
import React, { useEffect, useRef } from 'react';

const AddFolder = () => {
  const textInputRef = useRef(null);
  useEffect(()=>{
    textInputRef.current.focus();
  },[])
  return (
    <View style={{ backgroundColor: "#0A092D", flex: 1 }}>
      <SafeAreaView style={{ marginLeft: 20, marginRight: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Ionicons color="#fff" size={30} name="arrow-back-outline" />
          <Text style={styles.text}>Create folder</Text>
          <Text style={styles.text}>Done</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Input
           ref={textInputRef}
            inputStyle={{ color: "#fff" }}
            inputContainerStyle={{ borderBottomWidth: 3, borderColor: "#fff" }}
            errorStyle={{ color: "#fff" }}
            errorMessage="Folder title"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddFolder;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
