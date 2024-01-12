import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomSheetModal = ({ isVisible, onClose, onTakePhoto, onSelectImage }) => {
  const bottomSheetRef = useRef(null);

  // Close Bottom Sheet
  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    onClose();
  }, [onClose]);

  // Handlers for the actions
  const handleTakePhoto = () => {
    closeBottomSheet();
    onTakePhoto();
  };

  const handleSelectImage = () => {
    closeBottomSheet();
    onSelectImage();
  };

  // Function to render an item with an icon and text
  const renderItem = (iconName, text, onPress) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Icon name={iconName} size={24} color="#ffffff" />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );

  // Define the snap points based on the visibility
  const snapPoints = useMemo(() => (isVisible ? ['25%', '50%'] : ['10%']), [isVisible]);

  // Custom handle component
  const CustomHandle = () => (
    <View style={styles.handleContainer}>
      <TouchableOpacity style={styles.handle} onPress={closeBottomSheet} />
    </View>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={closeBottomSheet}
      handleComponent={CustomHandle} // Use the custom handle component
      // rest of your props
    >
      <View style={styles.container}>
        {renderItem("camera", "Máy ảnh", handleTakePhoto)}
        {renderItem("images", "Chọn ảnh từ thư viện", handleSelectImage)}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E3856', // Your custom background color
    flex: 1,
    alignItems: 'center',
    padding: 20, // Padding to ensure content is not too close to the edges
    paddingTop: 30, // Increased padding at the top to create more space
    paddingBottom: 30, // Reduced padding at the bottom
    height:228,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B5673', // The color of your item background
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%', // Full width items
    marginVertical: 10, // Margin between items
  },
  text: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
  },
  handleContainer: {
    backgroundColor:'#2E3856',
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    paddingTop: 10, // Space above the handle
  },
  handle: {
    width: 40, // Width of the handle
    height: 5, // Height of the handle
    borderRadius: 3,
    backgroundColor: '#747D9F',
    marginBottom: 10, // Space below the handle
  },
});

export default BottomSheetModal;
