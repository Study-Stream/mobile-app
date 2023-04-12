import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const Login: React.FC = () => {
  const { authorize, clearSession, user, error, getCredentials } = useAuth0();


  const onLogin = async () => {
    try {
      await authorize(
        { scope: 'openid profile email' },
        { customScheme: 'com.swarn2099.ticktopcloneapp' },
      );
      let credentials = await getCredentials();
      Alert.alert('AccessToken: ' + credentials.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      {user && <Text>You are logged in as {user.name}</Text>}
      {!user && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};

export default Login;
