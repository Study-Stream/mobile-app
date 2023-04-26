import React, { useState } from 'react';
import { StatusBar, Platform } from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeButtom from '../components/HomeButton';
import CourseJoin from '../pages/Join-Course';
import CourseCreate from '../pages/Create-Course';
import Discover from '../pages/Discover';
import Home from '../pages/Home';
import Inbox from '../pages/Inbox';
import Login from '../pages/Login';
import Me from '../pages/Me';
import Record from '../pages/Record';
import CourseDashboard from '../pages/CourseDashboard';
import { useAuth0 } from 'react-native-auth0';
import CreateCourse from '../pages/Create-Course';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const CoursesStack = createStackNavigator();

const CoursesStackNavigator = () => {
  return (
    <CoursesStack.Navigator>
      <CoursesStack.Screen
        name="CourseDashboard"
        component={CourseDashboard}
        options={{ headerShown: false }}
      />
      <CoursesStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <CoursesStack.Screen
        name="CourseCreate"
        component={CreateCourse}
        options={{ headerShown: false }}
      />
      <CoursesStack.Screen
        name="CourseJoin"
        component={CourseJoin}
        options={{ headerShown: false }}
      />
    </CoursesStack.Navigator>
  );
};

const AppRoutes: React.FC = () => {
  const [home, setHome] = useState(true);

  StatusBar.setBarStyle('dark-content');

  if (Platform.OS === 'android') StatusBar.setBackgroundColor('#fff');

  if (home) {
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('light-content');
    }
  } else {
    StatusBar.setHidden(false);
  }

  return (
    <Tab.Navigator
      shifting={false}
      barStyle={{
        backgroundColor: home ? '#000' : '#fff',
      }}
      initialRouteName="Courses"
      activeColor={home ? '#fff' : '#000'}
    >
      <Tab.Screen
        name="Courses"
        component={CoursesStackNavigator}
        listeners={{
          focus: () => setHome(true),
          blur: () => setHome(false),
        }}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen name="Home" component={Home} /> */}
      <Tab.Screen
        name="Live"
        component={Record}
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate('Record');
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <HomeButtom home={home} />,
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        listeners={{
          focus: () => setHome(true),
          blur: () => setHome(false),
        }}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStackScreen: React.FC = () => {
  const { user } = useAuth0();
  console.log('user', user);
  return (
    <Stack.Navigator mode="modal">
      {user ? (
        <>
          <Stack.Screen
            name="Main"
            component={AppRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Record"
            component={Record}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootStackScreen;
