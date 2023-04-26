import React, { useCallback, useEffect, useState } from 'react';
import { Image, Animated, Easing, Alert } from 'react-native';

import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

import {
  Container,
  Details,
  Actions,
  User,
  Tags,
  Music,
  MusicBox,
  BoxAction,
  TextAction,
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Item {
  id: number;
  username: string;
  tags: string;
  music: string;
  likes: number;
  comments: number;
  uri: string;
}

interface Props {
  play: boolean;
  item: Item;
}

const Feed: React.FC<Props> = ({ play, item }: any) => {
  // console.log('From feed: ', item);


  const [playing, setPlaying] = useState(play);
  const [progress, setProgress] = useState(0);


  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleVideoProgress = async (playbackStatus: any) => {
    if (!playbackStatus.isLoaded) {
      return;
    }

    if (playbackStatus.isPlaying) {
      setProgress(playbackStatus.positionMillis / playbackStatus.durationMillis);
    }
    // console.log('Progress: ', progress*100, '%');
  };
  // const spinValue = new Animated.Value(0);

  // Animated.loop(
  //   Animated.timing(spinValue, {
  //     toValue: 1,
  //     duration: 10000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }),
  // ).start();

  return (
    <>
      <LinearGradient
        colors={['rgba(0,0,0,.3)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '70%',
        }}
      />
      <Container>
        <TouchableOpacity onPress={() => console.log("Pressed")}>
        <Video
          source={{ uri: item.url }}
          rate={1.0}
          volume={100.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={play}
          isLooping
          style={{
            width: '100%',
            height: '100%',
          }}
          onError={error => console.log('Video Error: ', error)}
          onPlaybackStatusUpdate={handleVideoProgress}
          showsPlaybackControls={true}
        />
        </TouchableOpacity>
      </Container>
      <Details>
        <User>@{item.username}</User>
        <Tags>{item.caption}</Tags>
      </Details>
      <Actions>
        <BoxAction>
          <AntDesign
            style={{ alignSelf: 'center', color: "green" }}
            name="caretup"
            size={35}
            color="#fff"
          />
          <TextAction>Upvote</TextAction>
        </BoxAction>
        <BoxAction onPress={() => {console.log("Downvoted")}}>
          <AntDesign
            style={{ alignSelf: 'center', color: "red" }}
            name="caretdown"
            size={35}
            color="#fff"
          />
          <TextAction>Downvote</TextAction>
        </BoxAction>
      </Actions>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,.4)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '50%',
        }}
      />
    </>
  );
};

export default Feed;
