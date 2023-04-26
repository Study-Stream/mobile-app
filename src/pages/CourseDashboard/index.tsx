import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl, Modal, Alert, Pressable } from 'react-native';
import { Container, Title, SmallText, MainContent } from './styles';
import { Button, Text } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0';
import { getCourses, getUserDb, deleteCourse } from '../../api';
import Loading from '../../components/Loading';

function getRandomHexColor(): string {
  const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomColor = `#${(
    '000000' + getRandomInt(0, 0xffffff).toString(16)
  ).slice(-6)}`;
  return randomColor;
}

const styles = StyleSheet.create({
  scrollableCardView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    overflow: 'scroll',
    // padding: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '50%',
    // padding: 5,
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

const CourseDashboard: React.FC = () => {
  const { user } = useAuth0();
  const [courses, setCourses] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserDb(user.email).then(res => {
      console.log('CourseDashboard-user:', res.courses);
      getCourses(res.courses).then(courses => {
        console.log('CourseDashboard-courses:', courses);
        setCourses(courses.courses);
        setRefreshing(false);
      });
    });
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh]),
  );

  useEffect(() => {
    getUserDb(user.email).then(res => {
      console.log('CourseDashboard-user:', res.courses);
      getCourses(res.courses).then(courses => {
        console.log('CourseDashboard-courses:', courses);
        setCourses(courses.courses);
      });
    });
  }, [user]);

  const numCards = courses.length;
  const numRows = Math.ceil(numCards / 2);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalCourseId, setModalCourseId] = useState('');
  const DeleteCourseModal = () => {
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
              onPress={() => {
                deleteCourse(modalCourseId).then(res => {
                  console.log("Course deleted", modalCourseId)
                });
                setModalVisible(!modalVisible);
                }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '800',
                  textAlign: 'center',
                  marginBottom: 5,
                }}
              >
                Delete course
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
    courseNumber,
    courseId,
    joinCode,
  }: any) => {
    console.log(courseId);
    return (
      <View style={[styles.card, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', { courseId: courseId })}
          onLongPress={() => {
            setModalVisible(true);
            setModalCourseId(courseId);
          }}
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
            {courseName}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '400',
              textAlign: 'center',
            }}
          >
            {courseNumber}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '400',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            Join Code:{' '}
            <Text
              style={{
                fontWeight: '800',
                color: 'white',
                textDecorationLine: 'underline',
              }}
            >
              {joinCode}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Container>
        <Loading isVisible={loading} />
        <DeleteCourseModal />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <MainContent>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}
            >
              <View>
                <Title>Course Dashboard</Title>

                <SmallText>Click a course to enter its feed</SmallText>
              </View>

              <Button
                style={{
                  marginLeft: 'auto',
                  backgroundColor: '#000',
                  padding: 1,
                  borderRadius: 40,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                mode="contained"
                onPress={() => navigation.navigate('CourseCreate')}
              >
                <FontAwesome name="plus" size={14} />
              </Button>
            </View>
            <View style={styles.scrollableCardView}>
              {[...Array(numRows)].map((_, rowIndex) => {
                const startIndex = rowIndex * 2;
                const endIndex = Math.min(startIndex + 2, numCards);

                return (
                  <View style={styles.row} key={rowIndex}>
                    {courses.slice(startIndex, endIndex).map((card: any) => {
                      console.log('card-id', card.id);
                      return (
                      <Card
                          key={card._id}
                          color={getRandomHexColor()}
                          courseName={card.course_name}
                          courseNumber={card.course_number}
                          courseId={card._id}
                          joinCode={card.join_code}
                      />
                      );
                    })}
                    {endIndex - startIndex === 1 && (
                      <View style={styles.card} />
                    )}
                  </View>
                );
              })}
            </View>
          </MainContent>
        </ScrollView>
      </Container>
    </>
  );
};

export default CourseDashboard;
