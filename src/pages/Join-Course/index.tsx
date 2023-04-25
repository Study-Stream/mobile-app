import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Field from '../../components/Field';
import { Container, Title, SmallText, MainContent } from './styles';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { joinCourse } from '../../api';
import { useAuth0 } from 'react-native-auth0';
import Loading from '../../components/Loading';

const CourseJoin: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth0();

  const [joinCode, setJoinCode] = useState('');

  const [loading, setLoading] = useState(false);

  // function to join course
  const joinCourseHelper = async () => {
    console.log('Joining Course: ', joinCode, user.email);

    await joinCourse(user.email, joinCode).then(res => {
      navigation.navigate('CourseDashboard');
    });
  };

  return (
    <>
      <Container>
        <Loading isVisible={loading} />
        <ScrollView>
          <MainContent style={{ marginTop: 15 }}>
            <Title>Join Course 🍎</Title>
            <SmallText>
              If you have a join code, enter it below and join the class
            </SmallText>
            <Field
              placeholder="Enter Join Code"
              onChangeText={newText => setJoinCode(newText)}
            />
            <Button
              mode="contained"
              onPress={joinCourseHelper}
              color="#000"
              labelStyle={{ color: '#fff' }}
              style={{
                borderRadius: 25,
                width: '50%',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Lets Go
            </Button>
            {/* Create a course button  */}
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('CourseCreate')}
              color="#fff"
              labelStyle={{
                color: '#000',
              }}
              style={{
                borderColor: '#000',
                borderRadius: 25,
                width: '75%',
              }}
            >
              Create a Course instead
            </Button>
          </MainContent>
        </ScrollView>
      </Container>
    </>
  );
};

export default CourseJoin;
