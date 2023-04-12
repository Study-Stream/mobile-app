import React from 'react';
import { Auth0Provider } from 'react-native-auth0';
// import AppRoutes from './routes/app.routes';
import config from './src/auth0-configuration';
import RootStackScreen from './src/routes/app.routes';
import { NavigationContainer } from '@react-navigation/native';
const App: React.FC = () => {
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Auth0Provider>
  );
};

export default App;
