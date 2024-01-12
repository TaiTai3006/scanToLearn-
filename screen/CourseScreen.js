import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import imageIcon from './../assets/Image.png'; 
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheetModal from '../component/BottomSheetModal';
const CourseScreen = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const bottomSheetOptions = [
    {
      iconName: "camera",
      text: "Máy ảnh",
      onPress: () => {
        // Logic for taking photo
        closeModal();
      }
    },
    {
      iconName: "images",
      text: "Chọn ảnh từ thư viện",
      onPress: () => {
        // Logic for selecting image from library
        closeModal();
      }
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo học phần</Text>
        <TouchableOpacity>
          <Text style={styles.doneText}>Xong</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Tiêu đề" 
            placeholderTextColor="#ffffff" 
            textAlignVertical="bottom" // Align placeholder text at the bottom
          />
        </View>
        <TouchableOpacity style={styles.imageUpload} onPress={openModal}>
          <View style={styles.imageContainer}>
            <Image source={imageIcon} style={styles.imageIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        isVisible={isModalVisible}
        onClose={closeModal}
        options={bottomSheetOptions}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A092D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40, 
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20, 
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 40, 
  },
  input: {
    color: '#ffffff',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 3, 
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
  },
  imageUpload: {
    alignSelf: 'flex-start', 
    marginLeft: 20, 
    height: 170,
    width: '30%',
    borderWidth: 2,
    borderColor: '#2E3856',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20
  },
  imageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1, 
  },
  imageIcon: {
    width: 40, 
    height: 40, 
    resizeMode: 'contain' 
  },

});

export default CourseScreen;