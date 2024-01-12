import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import homeScreen from "../screen/homeScreen";

const homeName = "Home";
const searchName = "Search";
const settingsName = "Settings";
const addName = "Add";
const folderName = "Library";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Dummy Screen Component
const DummyScreen = ({ screenName }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{screenName}</Text>
  </View>
);
const NavBar = () => {
  return (
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
      <Tab.Screen name={searchName} component={homeScreen} />
      <Tab.Screen
        name={addName}
        component={homeScreen}
        options={{ tabBarLabelStyle: { display: "none" } }}
      />
      <Tab.Screen name={folderName} component={homeScreen} />
      <Tab.Screen name={settingsName} component={homeScreen} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="navbar" component={NavBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
