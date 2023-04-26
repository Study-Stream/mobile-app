import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import { Container, MainContent, Title } from '../CourseDashboard/styles';
import { ScrollView } from 'react-native-gesture-handler';

// create post
const CreatePostScreen = () => {
  const [postData, setPostData] = useState({
    course: '',
    url: '',
    startTime: '',
    endTime: '',
    caption: '',
  });

  const [menuVisible, setMenuVisible] = useState(false);

  const addPostToCourse = () => {
    console.log(postData);
  };

  const handleInputChange = (field: any, value: any) => {
    setPostData({ ...postData, [field]: value });
  };

  return (
    <Container>
      <ScrollView>
        <MainContent>
          <Title> Create a New Post </Title>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button onPress={() => setMenuVisible(true)}>
                {postData.course || 'Select a Course'}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                handleInputChange('course', 'Course 1');
                setMenuVisible(false);
              }}
              title="Course 1"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                handleInputChange('course', 'Course 2');
                setMenuVisible(false);
              }}
              title="Course 2"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                handleInputChange('course', 'Course 3');
                setMenuVisible(false);
              }}
              title="Course 3"
            />
          </Menu>

          <TextInput
            label="YouTube Video URL"
            value={postData.url}
            onChangeText={text => handleInputChange('url', text)}
          />

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              label="Start Time"
              value={postData.startTime}
              onChangeText={text => handleInputChange('startTime', text)}
              style={{ flex: 1 }}
            />
            <TextInput
              label="End Time"
              value={postData.endTime}
              onChangeText={text => handleInputChange('endTime', text)}
              style={{ flex: 1 }}
            />
          </View>

          <TextInput
            label="Caption"
            value={postData.caption}
            onChangeText={text => handleInputChange('caption', text)}
            multiline
            numberOfLines={3}
          />

          <Button mode="contained" onPress={addPostToCourse}>
            Add Post
          </Button>
        </MainContent>
      </ScrollView>
    </Container>
  );
};

export default CreatePostScreen;
