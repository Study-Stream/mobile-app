import React from 'react';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './routes/app.routes';

const Routes: React.FC = () => {
  return (
    <Auth0Provider
      domain={`${process.env.DOMAIN_KEY}`}
      clientId={`${process.env.CLIENT_ID}`}
    >
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Auth0Provider>
  );
};

export default Routes;
