import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Container, Title, SmallText, MainContent } from './styles';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth0 } from 'react-native-auth0';
import { getCourses, getUserDb } from '../../api';

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
});

const CourseDashboard: React.FC = () => {
  const { user } = useAuth0();
  const [courses, setCourses] = useState<any>([]);
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

  const Card = ({ color, courseName, courseNumber }: any) => {
    return (
      <View style={[styles.card, { backgroundColor: color }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Container>
        <ScrollView>
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
                      console.log('card', card);
                      return (
                        <Card
                          key={card.id}
                          color={getRandomHexColor()}
                          courseName={card.course_name}
                          courseNumber={card.course_number}
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
