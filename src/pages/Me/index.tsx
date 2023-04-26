import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl, Modal, Alert, Pressable, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useAuth0 } from 'react-native-auth0';
import Loading from '../../components/Loading';

import { getCourses, getUserPosts, getUserDb } from '../../api';

import { FontAwesome } from '@expo/vector-icons';

import {
  Container,
  Title,
  Header,
  Avatar,
  Username,
  Content,
  Stats,
  Separator,
  StatsText,
  StatsColumn,
  StatsNumber,
  ProfileColumn,
} from './styles';

const Me: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { clearSession, user } = useAuth0();
  const [userPosts, setUserPosts] = useState<any>([]);
  const [courses, setCourses] = useState<any>([]);

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  const styles = StyleSheet.create({
    scrollableCardView: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      overflow: 'scroll',
      // padding: 1,
    },
    card: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 100,
      margin: 10,
      borderRadius: 10,
      padding: 15,
      boxShadow: `0px 4px 10px 5px rgba(0, 0, 0, 0.25)`,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    deleteButton: {
      backgroundColor: '#EC386D',
    },
    closeButton: {
      backgroundColor: '#A9A9A9',
    },
    modalButton: {
      borderRadius: 10,
      padding: 10,
      margin: 10,
      elevation: 2,
      width: 125,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  // Delete when working
  const testPost = {
    course_name: 'Test Course',
    url: 'https://www.youtube.com/watch?v=6Oo-9Can3H8',
    id: 1,
  }

  useEffect(() => {
    getUserDb(user.email).then(res => {
      console.log('CourseDashboard-user:', res.courses);
      getCourses(res.courses).then(courses => {
        console.log('CourseDashboard-courses:', courses);
        setCourses(courses.courses);
      });
    });

    // Delete when working
    setUserPosts([testPost, testPost, testPost, testPost, testPost, testPost, testPost, testPost, testPost]);

    // Uncomment when working
    // getUserPosts(user.email).then(posts => {
    //   console.log('CourseDashboard-posts:', posts);
    //   setUserPosts(posts.posts);
    // });
  }, [user]);

  const numCards = userPosts.length;

  const [modalVisible, setModalVisible] = useState(false);
  const LogouteModal = ({ courseId }: any) => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.modalButton, styles.deleteButton]}
              onPress={onLogout}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '800',
                  textAlign: 'center',
                  marginBottom: 5,
                }}
              >
                Logout
              </Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.closeButton]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '800',
                  textAlign: 'center',
                  marginBottom: 5,
                }}
              >
                Nevermind
              </Text>
            </Pressable>
          </View>
        </View>
        </Modal>
      </View>
    );
  };

  const Card = ({
    color,
    courseName,
    url
  }: any) => {
    return (
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '800',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Course
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: 5,
          }}
        >
          {courseName}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '800',
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Video URL
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: 5,
          }}
        >
          {url}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <Loading isVisible={loading} />
      <LogouteModal />
      <Header>
        <Title>Your Profile</Title>
        <TouchableOpacity
          style={{ position: 'absolute', right: 13, top: 12 }}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome
            name="ellipsis-v"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </Header>
      <ScrollView>
        <Content>
          <Avatar source={{uri: user.picture}} />
          <Username>@{user.nickname}</Username>
          <Stats>
            <StatsColumn>
              <StatsNumber>{courses.length}</StatsNumber>
              <StatsText>Courses</StatsText>
            </StatsColumn>
            <Separator>|</Separator>
            <StatsColumn>
              <StatsNumber>{userPosts.length}</StatsNumber>
              <StatsText>Posts</StatsText>
            </StatsColumn>
          </Stats>
          <ProfileColumn>
            <Title>Your Posts</Title>
          </ProfileColumn>

          <View style={styles.scrollableCardView}>
              {[...Array(numCards)].map((_, rowIndex) => {
                const startIndex = rowIndex * 2;
                const endIndex = Math.min(startIndex + 2, numCards);

                return (
                  <View key={rowIndex}>
                    {userPosts.slice(startIndex, endIndex).map((card: any) => {
                      console.log('card-id', card.id);
                      return (
                      <Card
                          key={card._id}
                          color="#89CFF0"
                          courseName={card.course_name}
                          url={card.url}
                      />
                      );
                    })}
                  </View>
                );
              })}
            </View>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Me;
