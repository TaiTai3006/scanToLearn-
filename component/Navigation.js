import { StyleSheet, Text, View } from "react-native";
import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import homeScreen from "../screen/homeScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetModal from './BottomSheetModal';
import PreviewScreen from "../screen/PreviewScreen";
import LibraryScreen from "../screen/LibraryScreen";
import CourseScreen from "../screen/CourseScreen";
const homeName = "Home";
const searchName = "Search";
const settingsName = "Settings";
const addName = "Add";
const folderName = "Library";
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Dummy Screen Component
const DummyScreen = ({ screenName }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{screenName}</Text>
  </View>
);
const NavBar = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const navigation = useNavigation();
  // Toggle Bottom Sheet
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };
  
  const bottomSheetOptions = [
    {
      iconName: "folder",
      text: "Học phần",
      onPress: () => {
        // Logic for taking photo
        setIsBottomSheetVisible(false);
        navigation.navigate('CourseScreen'); 
      }
    },
    {
      iconName: "file-tray-stacked",
      text: "Thư mục",
      onPress: () => {
        // Logic for selecting image from library
        setIsBottomSheetVisible(false);
      }
    },
  ];
  return (
    <>
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === searchName) {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          } else if (rn === addName) {
            iconName = focused ? "add-circle-sharp" : "add-circle-outline";
            size = 45;
          } else if (rn === folderName) {
            iconName = focused ? "folder" : "folder-outline";
          }
          return (
            <Ionicons
              style={{ marginTop: 5 }}
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#4B526C",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginBottom: 0,
        },
        tabBarStyle: {
          backgroundColor: "#0A092B",
          borderTopColor: "#2C2D42",
          borderTopWidth: 2,
          borderStyle: "solid",
          height: 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name={homeName} component={homeScreen} />
      <Tab.Screen name={searchName} component={PreviewScreen} />
        <Tab.Screen
          name={addName}
          component={DummyScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleBottomSheet();
            },
          }}
          options={{ tabBarLabelStyle: { display: "none" } }}
      />
      <Tab.Screen name={folderName} component={LibraryScreen} />
      <Tab.Screen name={settingsName} component={PreviewScreen} />
  
    </Tab.Navigator>
        <BottomSheetModal
      isVisible={isBottomSheetVisible}
      onClose={() => setIsBottomSheetVisible(false)}
      options={bottomSheetOptions}
    />
  </>
  );
};

export const Navigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="navbar" component={NavBar} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
        <Stack.Screen name="CourseScreen" component={CourseScreen} />
      </Stack.Navigator>
     
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};
