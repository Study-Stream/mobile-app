import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

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
  const { authorize } = useAuth0();
  const { clearSession } = useAuth0();
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');

  const onPressLogin = async (): Promise<void> => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onPressLogout = async (): Promise<void> => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

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
