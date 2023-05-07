import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import ViewPager from '@react-native-community/viewpager';

// import server from '../../../server.json';
import Feed from './Feed';

import { Container, Header, Text, Tab, Separator } from './styles';
import { getCourseVideos, getVideoUri } from '../../api';
import Loading from '../../components/Loading';
import { ActivityIndicator } from 'react-native-paper';

const Home = ({ route }: any) => {
  const { courseId } = route.params;
  const [active, setActive] = useState(0);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    await getCourseVideos(courseId).then(async res => {
      const postsWithVideoUrls = await Promise.all(
        res.course.posts.map(async (post: any) => {
          const videoUrl = await getVideoUri(post.url);
          return { ...post, uri: post.url, url: videoUrl.video, };
        }),
      );
      setPosts(postsWithVideoUrls);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <Container>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <ActivityIndicator
          animating={true}
          color="white"
          size="large"
          accessibilityStates={undefined}
          accessibilityComponentType={undefined}
          accessibilityTraits={undefined}
        />
        <Text>Loading Posts</Text>
      </View>

      {/* Put a spinner below */}
    </Container>
  ) : (
    <Container>
      <Loading isVisible={loading} />
      <ViewPager
        onPageSelected={e => {
          setActive(e.nativeEvent.position);
        }}
        orientation="vertical"
        style={{ flex: 1 }}
        initialPage={0}
      >
        {posts.length > 0 ? (
          posts.map((item: any) => (
            <View key={item.id}>
              <Feed item={item} play={Number(item.id) === active} />
            </View>
          ))
        ) : (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Text style={{ color: 'grey' }}>No Posts yet</Text>
          </View>
        )}
      </ViewPager>
    </Container>
  );
};

export default Home;
