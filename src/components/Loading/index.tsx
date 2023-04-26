import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, View, StyleSheet, Text, Modal, ActivityIndicator } from 'react-native';
import { Container, Title, SmallText, MainContent } from './styles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    header: {
      fontSize: 45,
      fontWeight: '700',
      textAlign: 'center',
      margin: 10,
      color: 'white',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      margin: 10,
      color: 'white',
    },
    video: {
      ...StyleSheet.absoluteFillObject,
    },
    overlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(256,256,256,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
  });

const Loading = ({ isVisible }: any) => {
    return (
      <View>
        <Modal
          transparent={true}
          visible={isVisible}
        >
          <Container>
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#6082B6" />
              <SmallText>Loading...</SmallText>
            </View>
          </Container>
        </Modal>
      </View>
    );
};

export default Loading;