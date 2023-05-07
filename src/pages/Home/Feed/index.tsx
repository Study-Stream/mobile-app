import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Image, Animated, Easing, Alert } from 'react-native';

import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

import {
  Container,
  Details,
  Actions,
  User,
  Tags,
  BoxAction,
  TextAction,
  Link,
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
  startTime?: string;
  endTime?: string;
}

interface Props {
  play: boolean;
  item: Item;
}

const timeStringToSeconds = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

const Feed: React.FC<Props> = ({ play, item }: any) => {
  const [playing, setPlaying] = useState(play);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<Video>(null);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);

  const increementVote = (voteType) => {
    voteType === "upVote" ? setUpVote(upVote + 1) : setDownVote(downVote + 1);
  };

  const startTimeInSeconds = item.startTime ? timeStringToSeconds(item.startTime) : undefined;
  const endTimeInSeconds = item.endTime ? timeStringToSeconds(item.endTime) : undefined;

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(async () => {
    setPlaying(prev => !prev);

    if (!playing) {
      if (startTimeInSeconds) {
        await videoRef.current?.setPositionAsync(startTimeInSeconds * 1000);
      }
      await videoRef.current?.playAsync();
    } else {
      await videoRef.current?.pauseAsync();
    }
  }, [playing, startTimeInSeconds]);

  const handleVideoProgress = async (playbackStatus: any) => {
    if (!playbackStatus.isLoaded) {
      return;
    }

    const { positionMillis, durationMillis, isPlaying } = playbackStatus;
    
    if (endTimeInSeconds && positionMillis >= endTimeInSeconds * 1000) {
      setPlaying(false);
      await videoRef.current?.pauseAsync();
    }

    if (isPlaying) {
      setProgress(positionMillis / durationMillis);
    }
  };


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
          ref={videoRef}
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
        <Link onPress={() => Linking.openURL(item.uri)}>View full video</Link>
      </Details>
      <Actions>
        <BoxAction onPress={() => increementVote('upVote')}>
          <AntDesign
            style={{ alignSelf: 'center', color: "green" }}
            name="caretup"
            size={35}
            color="#fff"
          />
          <TextAction>Upvote {upVote}</TextAction>
        </BoxAction>
        <BoxAction onPress={() => increementVote('downVote')}>
          <AntDesign
            style={{ alignSelf: 'center', color: "red" }}
            name="caretdown"
            size={35}
            color="#fff"
          />
          <TextAction>Downvote {downVote}</TextAction>
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
