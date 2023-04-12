import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import Field from '../../components/Field';

import { Container, Title, SmallText } from './styles';
import { MainContent } from '../Join-Course/styles';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CourseCreate: React.FC = () => {
  const navigation = useNavigation();
  // better way to write this, but will change this later
  const [course, setCourseName] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  return (
    <Container>
      <ScrollView>
        <MainContent>
          <Title>Create Course 🍎</Title>
          <SmallText>
            Fill out some basic information so you can start sharing clips and
            inviting other students to your course
          </SmallText>
          <Field
            placeholder="Course Name"
            onChangeText={newText => setCourseName(newText)}
          />
          <Field
            placeholder="Course Number"
            onChangeText={newText => setCourseNumber(newText)}
          />
          <Field
            placeholder="Course Description"
            onChangeText={newText => setCourseDescription(newText)}
          />
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
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
            onPress={() => navigation.navigate('CourseJoin')}
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
            Join a Course instead
          </Button>
        </MainContent>
      </ScrollView>
    </Container>
  );
};

export default CourseCreate;
