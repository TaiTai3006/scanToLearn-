import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { collection, getDocs } from "firebase/firestore"; 
import { storage } from './firebaseConfig';
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";



const homeName = "Home";
const searchName = "Search";
const settingsName = "Settings";
const addName = "Add";
const folderName = "Library";

const Tab = createBottomTabNavigator();

// Dummy Screen Component
const DummyScreen = ({ screenName }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{screenName}</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
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
          tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginBottom: 0 },
          tabBarStyle: {
            backgroundColor: "#0A092B",
            borderTopColor: "#2C2D42",
            borderTopWidth: 2,
            borderStyle: "solid",
            height: 80,
          },
          headerShown: false
        })}
      >
        <Tab.Screen name={homeName} children={() => <DummyScreen screenName={homeName} />} />
        <Tab.Screen name={searchName} children={() => <DummyScreen screenName={searchName} />} />
        <Tab.Screen
          name={addName}
          children={() => <DummyScreen screenName={addName} />}
          options={{ tabBarLabelStyle: { display: "none" } }}
        />
        <Tab.Screen name={folderName} children={() => <DummyScreen screenName={folderName} />} />
        <Tab.Screen name={settingsName} children={() => <DummyScreen screenName={settingsName} />} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
