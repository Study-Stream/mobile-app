import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

import Field from '../../../components/Field';

import {
  Container,
  Title,
  Content,
  SmallText,
  CreateCourseButton,
  LinkText,
  CreateCourseColumn,
  CreateCourseColumnText,
  GradientBackground,
} from './styles';

const CreateCourse: React.FC = () => {
  // better way to write this, but will change this later
  const [course, setCourseName] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  return (
    <>
      <Container>
        <ScrollView>
          <Content>
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
            <CreateCourseColumn>
              <CreateCourseButton>
                <CreateCourseColumnText>Create Course</CreateCourseColumnText>
              </CreateCourseButton>
            </CreateCourseColumn>
          </Content>
        </ScrollView>
      </Container>
    </>
  );
};

export default CreateCourse;
