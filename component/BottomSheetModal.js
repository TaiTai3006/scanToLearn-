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

 
  const renderItem = (iconName, text, onPress) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Icon name={iconName} size={24} color="#ffffff" />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );


  const snapPoints = useMemo(() => (isVisible ? ['30%', '50%'] : ['10%']), [isVisible]);

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
      handleComponent={CustomHandle} 

    >
      <View style={styles.container}>
        {renderItem("folder", "Học phần", handleTakePhoto)}
        {renderItem("file-tray-stacked", "Thư mục", handleSelectImage)}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E3856', 
    flex: 1,
    alignItems: 'center',
    padding: 20, 
    paddingTop: 30, 
    paddingBottom: 30, 
    height:228,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B5673', 
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%', 
    marginVertical: 10, 
  },
  text: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  handleContainer: {
    backgroundColor:'#2E3856',
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    paddingTop: 0,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#747D9F',
    marginTop: 10, 
  },
});

export default BottomSheetModal;
