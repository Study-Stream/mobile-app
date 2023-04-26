import React, { ComponentType } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';

interface Props extends NavigationContainerProps {
  component: ComponentType<any>;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useAuth();
  const Stack = createStackNavigator();

  if (!authenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
