import React, { useState, useEffect } from 'react';
import { StyleSheet, useColorScheme, View, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Snackbar from 'react-native-snackbar';

const Snackbar: React.FC = () => {
  // display success message
  const showSuccessSnackbar = () => {
    Snackbar.show({
      text: 'Success!',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'green',
      textColor: 'white'
    });
  };

  // display error message
  const showErrorSnackbar = () => {
    Snackbar.show({
      text: 'Error!',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'red',
      textColor: 'white'
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Success Snackbar" onPress={showSuccessSnackbar} />
      <Button title="Show Error Snackbar" onPress={showErrorSnackbar} />
    </View>
  );
};

export default Snackbar;