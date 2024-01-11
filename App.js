import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { collection, getDocs } from "firebase/firestore"; 
import { storage } from './firebaseConfig';
import { useEffect } from 'react';

export default function App() {
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(storage, "hihi"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
fetchData()
  },[])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
