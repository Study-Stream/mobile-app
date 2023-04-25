import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Video } from 'expo-av';
import { getUserDb } from '../../api';
import Loading from '../../components/Loading';

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
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

const Login: React.FC = () => {
  const { authorize, clearSession, user, getCredentials} = useAuth0();
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      await authorize(
        { scope: 'openid profile email' },
        { customScheme: 'com.swarn2099.ticktopcloneapp' },
      )
      let credentials = await getCredentials();
      // Alert.alert('AccessToken: ' + credentials.accessToken);
    } catch (e) {
      console.log(e);
    }
  };
  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  const createUser  = async () => {
    Alert.alert('CreateUser');
     // save user to database
     const myHeaders = new Headers();
     myHeaders.append('Content-Type', 'application/json');


     let requestOptions: any = {
       method: 'POST',
       headers: myHeaders,
       body: JSON.stringify({
         email: user.email,
         courses: [],
       }),
       redirect: 'follow',
     };

     await fetch('http://localhost:3002/users/create', requestOptions)
       .then(response => response.text())
       .then(result => console.log(result))
       .catch(error => console.log('error', error));

  }

  const loggedIn = user !== undefined && user !== null;

  useEffect(() => {

    if (user !== undefined && user !== null) {
      getUserDb(user.email).then((res) => {
        console.log("UserDB: ", res.email)
        if (res === undefined || res === null) {
          createUser();
          Alert.alert('CreateUser');
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Loading isVisible={loading} />
      <Video
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        }}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay={true}
        isLooping
        style={styles.video}
      />
      <LinearGradient
        colors={['rgba(58, 28, 113, 0.95)', 'rgba(215, 109, 119, 0.75)']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.overlay}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.header}>StudyStream</Text>
        <Text style={styles.subtitle}>Learn. Stream. Repeat.</Text>
        <Button
          onPress={loggedIn ? onLogout : onLogin}
          mode="contained"
          labelStyle={{ color: 'black' }}
          style={{
            margin: 10,
            borderRadius: 20,
            padding: 5,
            backgroundColor: '#fff',
          }}
        >
          Get Started
        </Button>
        <Button
          onPress={onLogout }
          mode="contained"
          labelStyle={{ color: 'black' }}
          style={{
            margin: 10,
            borderRadius: 20,
            padding: 5,
            backgroundColor: '#fff',
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Login;
