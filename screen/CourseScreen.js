import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button
} from "react-native";
import imageIcon from "./../assets/Image.png";
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheetModal from "../component/BottomSheetModal";
import { launchImageLibrary } from "react-native-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch, connect } from 'react-redux';
import { addCourse } from "../redux/actions/courseAction";
import store from "../redux/reducers/index"
import { useNavigation } from "@react-navigation/native";


const CourseScreen = (  ) => {
    
   
    // console.log(courses);
    const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageUris, setImageUris] = useState([]);
  const dispatch = useDispatch();

  const [inputTitle, setInputTitle] = useState('');
//   const handleAddCourse = () => {
   
//     dispatch(addCourse(inputTitle, imageUris));
//     // console.log("titile",title);
    
//     setInputTitle(''); // Reset inputTitle after adding the course
//     navigation.navigate("PreviewScreen")
//   };
const handleAddCourse = async () => {
    try {
      // Upload images to Firebase and get download URLs
      const downloadURLs = await uploadImagesToFirebase(imageUris);

      // Dispatch the addCourse action with the title and download URLs
      dispatch(addCourse(inputTitle, downloadURLs));

      // Reset inputTitle and navigate to the preview screen
      setInputTitle('');
      navigation.navigate('PreviewScreen');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
  const handleScrollNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

 

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const selectImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("lib:", result);

    if (!result.canceled) {
      let selectedUris = [];

      if (result.assets && result.assets.length > 0) {
        selectedUris = result.assets.map((asset) => asset.uri);
      } else if (result.uri) {
        selectedUris = [result.uri];
      }

      console.log("Captured image URI: ", selectedUris);

      setImageUris((prevUris) => [...prevUris, ...selectedUris]);
      await uploadImagesToFirebase(selectedUris);
    } else {
      console.error("No URI found in image library response");
    }

    closeModal();
  };

  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uris = result.assets.map((asset) => asset.uri);
        console.log("Captured image URI: ", uris);
        setImageUris([...imageUris, ...uris]);
        await uploadImagesToFirebase(uris);
      } else {
        console.error("No URI found in camera response");
      }
    } else {
      console.error("Camera permission not granted");
    }
  };
  const uploadImagesToFirebase = async (uris) => {
    const tasks = uris.map(async (uri) => {
      const filename = uri.match(/\/([^\/]+)$/)[1];
      const storageRef = ref(storage, `images/${filename}`);
      const imgBlob = await fetch(uri).then((r) => r.blob());
      await uploadBytes(storageRef, imgBlob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    });

    return Promise.all(tasks);
  };

//   const uploadImagesToFirebase = async (uris) => {
//     if (!uris) {
//       console.error("Invalid URIs passed to upload function");
//       return;
//     }

//     try {
//       const tasks = uris.map(async (uri) => {
//         if (!uri) {
//           throw new Error("Invalid URI passed to upload function");
//         }

//         const filename = uri.match(/\/([^\/]+)$/)[1];
//         if (!filename) {
//           throw new Error("Could not extract filename from URI");
//         }

//         const storageRef = ref(storage, `images/${filename}`);
//         const imgBlob = await fetch(uri).then((r) => r.blob());
//         return uploadBytes(storageRef, imgBlob);
//       });

//       const uploadResults = await Promise.all(tasks);

//       console.log("Images uploaded to the bucket!");
//       const downloadURLs = await Promise.all(
//         uploadResults.map((uploadTask) => getDownloadURL(uploadTask.ref))
//       );
//       console.log("Files available at", downloadURLs);
//     } catch (error) {
//       console.error("Error uploading image: ", error);
//     }
//   };

  const bottomSheetOptions = [
    {
      iconName: "camera",
      text: "Camera",
      onPress: takePicture,
    },
    {
      iconName: "images",
      text: "Select Image from Library",
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
            onChangeText={(text) => setInputTitle(text)}
           value={inputTitle}
          />
        </View>


        <View style={styles.imageRowContainer}>
          {imageUris.length > 0
            ? imageUris.map((uri, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image source={{ uri }} style={styles.image} />
                </View>
              ))
            : null}
          <TouchableOpacity style={styles.imageUpload} onPress={openModal}>
            <View style={styles.imageContainer}>
              <Image source={imageIcon} style={styles.imageIcon} />
            </View>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#0A092D",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  doneText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  input: {
    color: "#ffffff",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 3,
    width: "100%",
    marginBottom: 20,
    fontSize: 16,
  },
  imageUpload: {
    width: "30%",
    borderWidth: 2,
    borderColor: "#2E3856",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  imageRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 170,
  },
  imagePreviewContainer: {
    width: "30%",
    borderWidth: 2,
    borderColor: "#2E3856",
    borderStyle: "dashed",
    borderRadius: 10,
    marginRight: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Asume you want to fill the area
  },
});

const mapStateToProps = (state) => ({
    title: state.courses ? state.courses.title : ' ddaay laf title',
    images: state.courses ? state.courses.images : [],
    // courses: state.courses ? state.course : [],
  });
  
  export default connect((state) => ({ courses: state.courses }))(CourseScreen);