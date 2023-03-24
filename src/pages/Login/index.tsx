import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

import Field from '../../components/Field';

import {
  Container,
  Title,
  Content,
  SmallText,
  SignInButton,
  LinkText,
  SignInColumn,
  SignInColumnText,
  GradientBackground,
} from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  return (
    <>
      <GradientBackground>
        <Container>
          <ScrollView>
            <Content>
              <Title>StudyStream</Title>
              <SmallText>Keep Scrolling and Learning</SmallText>
              <Field
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={newText => setEmail(newText)}
              />
              <Field
                placeholder="Password"
                secureTextEntry
                onChangeText={newText => setPassword(newText)}
              />
              <SignInColumn>
                <SignInButton>
                  <SignInColumnText>Sign In</SignInColumnText>
                </SignInButton>
              </SignInColumn>
              <SmallText>
                Don’t have an account?
                <LinkText>Signup here</LinkText>
              </SmallText>
            </Content>
          </ScrollView>
        </Container>
      </GradientBackground>
    </>
  );
};

export default Login;
