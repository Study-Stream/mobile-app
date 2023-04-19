import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import server from '../../../server.json';
import Feed from './Feed';

import { Container, Header, Text, Tab, Separator } from './styles';
import { getCourseVideos, getVideoUri } from '../../api';

const Home = ({ route }: any) => {
  const { courseId } = route.params;
  const [active, setActive] = useState(0);
  const [posts, setPosts] = useState<any>([]);

  const getPosts = async () => {
    getCourseVideos(courseId).then(async (res) => {
      const postsWithVideoUrls = await Promise.all(
        res.course.posts.map(async (post: any) => {
          const videoUrl = await getVideoUri(post.url);
          return { ...post, url: videoUrl.video };
        })
      );
      setPosts(postsWithVideoUrls);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <ViewPager
        onPageSelected={e => {
          setActive(e.nativeEvent.position);
        }}
        orientation="vertical"
        style={{ flex: 1 }}
        initialPage={0}
      >
        {posts.map((item: any) => (
          <View key={item.id}>
            <Feed item={item} play={Number(item.id) === active} />
          </View>
        ))}
      </ViewPager>
    </Container>
  );
};

export default Home;
