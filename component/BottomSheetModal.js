// BottomSheetModal.js
import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetModal = ({ isVisible, onClose }) => {
  const bottomSheetRef = useRef(null);

  // Close Bottom Sheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    onClose();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={['25%', '50%']}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Add Content Here</Text>
        <Button title="Close" onPress={closeBottomSheet} />
      </View>
    </BottomSheet>
  );
};

export default BottomSheetModal;
