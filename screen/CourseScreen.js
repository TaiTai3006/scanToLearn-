  import React, { useState, useEffect } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
  import imageIcon from './../assets/Image.png';
  import Icon from 'react-native-vector-icons/Ionicons';
  import BottomSheetModal from '../component/BottomSheetModal';
  import { launchImageLibrary } from 'react-native-image-picker';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { storage } from '../firebaseConfig';
  import { Camera } from 'expo-camera';
  import * as ImagePicker from 'expo-image-picker';

  const CourseScreen = ({ navigation }) => {
      const [isModalVisible, setModalVisible] = useState(false);
      const [cameraPermission, setCameraPermission] = useState(null);
      const [galleryPermission, setGalleryPermission] = useState(null);
      const [imageUri, setImageUri] = useState(null);

      useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(cameraStatus.status === 'granted');
    
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

      const openModal = () => setModalVisible(true);
      const closeModal = () => setModalVisible(false);

      const selectImageFromLibrary = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };
    
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                console.log('Selected image URI: ', uri);
                await uploadImageToFirebase(uri);
            } else {
                console.error('No URI found in response');
            }
        });
        closeModal();
    };
    
        const takePicture = async () => {
          let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
          });

          if (!result.cancelled && result.assets && result.assets.length > 0) {
              const uri = result.assets[0].uri;
              console.log('Captured image URI: ', uri);
              setImageUri(uri);
              await uploadImageToFirebase(uri);
          } else {
              console.error('No URI found in camera response');
          }
      };
      const uploadImageToFirebase = async (uri) => {
        if (!uri) {
            console.error("Invalid URI passed to upload function");
            return;
        }
        try {
            const filename = uri.match(/\/([^\/]+)$/)[1];
            if (!filename) {
                console.error("Could not extract filename from URI");
                return;
            }
      
            const storageRef = ref(storage, `images/${filename}`);
            const imgBlob = await fetch(uri).then((r) => r.blob());
            const uploadTask = await uploadBytes(storageRef, imgBlob).catch((error) => {
                throw error; 
            });
      
            console.log('Image uploaded to the bucket!');
            const downloadURL = await getDownloadURL(uploadTask.ref);
            console.log('File available at', downloadURL);
      
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
      };

      const bottomSheetOptions = [
          {
              iconName: "camera",
              text: "Máy ảnh",
              onPress: takePicture,
          },
          {
              iconName: "images",
              text: "Chọn ảnh từ thư viện",
              onPress: selectImageFromLibrary,
          },
      ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Course</Text>
                <TouchableOpacity>
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Title" 
                        placeholderTextColor="#ffffff" 
                        textAlignVertical="bottom"
                    />
                </View>
                <TouchableOpacity style={styles.imageUpload} onPress={openModal}>
                    <View style={styles.imageContainer}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        ) : (
                            <Image source={imageIcon} style={styles.imageIcon} />
                        )}
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
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
    });

    export default CourseScreen;