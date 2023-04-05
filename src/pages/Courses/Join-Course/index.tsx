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
  JoinCourseButton,
  LinkText,
  JoinCourseColumn,
  JoinCourseColumnText,
  GradientBackground,
} from './styles';

const CourseJoin: React.FC = () => {
  const [courseCode, setCourseCode] = useState('');

  return (
    <>
      <Container>
        <ScrollView>
          <Content>
            <Title>Join Course 🍎</Title>
            <SmallText>
              If you have a join code, enter it below and join the class.
            </SmallText>
            <Field
              placeholder="Enter Join Code"
              onChangeText={newText => setCourseCode(newText)}
            />
            <JoinCourseColumn>
              <JoinCourseButton>
                <JoinCourseColumnText>Lets go</JoinCourseColumnText>
              </JoinCourseButton>
            </JoinCourseColumn>
            <SmallText>
              Want to create a course?
              <LinkText>Create a course Instead</LinkText>
            </SmallText>
          </Content>
        </ScrollView>
      </Container>
    </>
  );
};

export default CourseJoin;
