import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Field from '../../components/Field';
import { Container, Title, SmallText, MainContent } from './styles';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CourseJoin: React.FC = () => {
  const navigation = useNavigation();
  // better way to write this, but will change this later
  const [joinCode, setJoinCode] = useState('');

  return (
    <>
      <Container>
        <ScrollView>
          <MainContent style={{ marginTop: 15}}>
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
              onPress={() => navigation.navigate('CourseJoin')}
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
