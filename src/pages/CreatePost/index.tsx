import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  TextInput,
  Button,
  List,
  Divider,
  Text,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import { Container, MainContent, Title } from '../CourseDashboard/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { getCourses, getUserDb, addPostToCourse } from '../../api';
import { useAuth0 } from 'react-native-auth0';

const CreatePostScreen = () => {
  const [postData, setPostData] = useState({
    course: '',
    courseId: '',
    url: '',
    startTime: '',
    endTime: '',
    caption: '',
  });

  const [accordionVisible, setAccordionVisible] = useState(false);
  const [courses, setCourses] = useState([]); // ['Course 1', 'Course 2', 'Course 3'
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const { user } = useAuth0();

  const createPost = () => {
    console.log(postData);
    const { courseId } = postData;
    addPostToCourse(courseId, postData).then(res => {
      console.log('res: ', res);
      setVisible(true);
      setTimeout(() => {
        setPostData({
          course: '',
          courseId: '',
          url: '',
          startTime: '',
          endTime: '',
          caption: '',
        });
        setVisible(false);
      }, 3000);
    });
  };

  const handleInputChange = (field: any, value: any) => {
    setPostData({ ...postData, [field]: value });
  };

  const handleCourseSelect = (course: any) => {
    setPostData({ ...postData, course: course.name, courseId: course.id });
    setAccordionVisible(false);
  };

  const isEmpty = (obj: any) => {
    if (obj.startTime === '' || obj.endTime === '') {
      return false;
    }
    return !Object.values(obj).every(val => val !== '');
  };
  const isValid = (obj: any) => {
    if (
      obj.course === '' ||
      obj.courseId === '' ||
      obj.url === '' ||
      obj.caption === ''
    ) {
      return false;
    }

    if (
      obj.startTime !== '' &&
      !/^(0?[0-9]|1[0-2]):[0-5][0-9] [AP][M]$/.test(obj.startTime)
    ) {
      return false;
    }

    if (
      obj.endTime !== '' &&
      !/^(0?[0-9]|1[0-2]):[0-5][0-9] [AP][M]$/.test(obj.endTime)
    ) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    // get user's courses from db and set to state here
    getUserDb(user.email).then(res => {
      getCourses(res.courses).then(courses => {
        // loop through courses and add the name to a state
        // array of courses
        const courseNames = courses.courses.map(({ _id, course_name }: any) => {
          return {
            id: _id,
            name: course_name,
          };
        });
        setCourses(courseNames);
        setIsLoading(false);
      });
    });
  }, []);

  return isLoading ? (
    <Container>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <ActivityIndicator
          animating={true}
          color="white"
          size="large"
          accessibilityStates={undefined}
          accessibilityComponentType={undefined}
          accessibilityTraits={undefined}
        />
        <Text>Loading Posts</Text>
      </View>

      {/* Put a spinner below */}
    </Container>
  ) : (
    <Container>
      <ScrollView>
        {courses.length > 0 ? (
          <>
            <MainContent>
              <Title> New Post </Title>
              <List.Accordion
                title={postData.course || 'Select a Course'}
                expanded={accordionVisible}
                onPress={() => setAccordionVisible(!accordionVisible)}
              >
                {/* loop through courses and add a list item for each course */}
                {courses.map((course: any) => {
                  console.log('Courses Map: ', course);
                  return (
                    <>
                      <List.Item
                        title={course.name}
                        onPress={() => {
                          handleCourseSelect(course);
                        }}
                      />
                      <Divider />
                    </>
                  );
                })}
              </List.Accordion>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '75%',
                }}
              >
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
                <Button
                  mode="contained"
                  disabled={isValid(postData) ? false : true}
                  onPress={createPost}
                >
                  Add Post{' '}
                  {postData.course !== '' ? `to ${postData.course}` : null}
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => {
                    setPostData({
                      course: '',
                      courseId: '',
                      url: '',
                      startTime: '',
                      endTime: '',
                      caption: '',
                    });
                  }}
                >
                  Reset
                </Button>
              </View>
            </MainContent>

          </>
        ) : (
          <Container>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <ActivityIndicator
                animating={true}
                color="white"
                size="large"
                accessibilityStates={undefined}
                accessibilityComponentType={undefined}
                accessibilityTraits={undefined}
              />
              <Text>Please join a course to be able to post</Text>
            </View>

            {/* Put a spinner below */}
          </Container>
        )}
      </ScrollView>
      <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              style={{ backgroundColor: 'green' }}
              action={{
                label: 'Dismiss',
                onPress: () => {
                  // Do something
                },
              }}
            >
              Post Added!
            </Snackbar>
    </Container>
  );
};

export default CreatePostScreen;
