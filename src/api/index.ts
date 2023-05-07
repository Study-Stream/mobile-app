var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const api_url = "http://localhost:3000";
// const api_url = 'http://b8a8-2600-1700-1d52-d400-45f8-1c78-ce88-7299.ngrok-free.app';

export const getUserDb = async (email: any) => {
  return await fetch(`${api_url}/users?email=${email}`, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }).then(response => response.json())
};

export const joinCourse = async (email: any, joinCode: any) => {
  console.log(`email: ${email} joinCode: ${joinCode}`);
  return await fetch(`${api_url}/users/join?email=${email}&joinCode=${joinCode}`, {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow',
  }).then(response => response.json())
};


export const createCourse = async (courseName: any, courseNumber: any, courseDescription: any) => {
  return await fetch(`${api_url}/courses/create`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      course_name: courseName,
      course_number: courseNumber,
      course_description: courseDescription,
    }),
    redirect: 'follow',
  }).then(response => response.json())
    .catch(error => console.log('error', error));
}

export const getCourses = async (courseIds: any) => {
  return await fetch(`${api_url}/courses/getCourses`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      courseIds: courseIds
    }),
    redirect: 'follow',
  }).then(response => response.json())
};


export const getVideoUri = async (video_url: string) => {

  return await fetch(`${api_url}/courses/video?url=${video_url}`, {
    method: 'GET',
    redirect: 'follow'
  })
    .then(response => response.json());
}


export const getCourseVideos = async (courseId: any) => {
  return await fetch(`${api_url}/courses/${courseId}`, {
    method: 'GET',
    redirect: 'follow'
  })
    .then(response => response.json());

}

export const deleteCourse = async (courseId: any) => {
  return await fetch(`${api_url}/courses/${courseId}`, {
    // delete course code
  })
    .then(response => response.json());

}

export const getUserPosts = async (email: any) => {
  return await fetch(`${api_url}/users/posts?email=${email}`, {
    method: 'GET',
    redirect: 'follow'
  })
    .then(response => response.json());

}

// delete course from user
export const deleteCourseFromUser = async (email: any, courseId: any) => {
  return await fetch(`${api_url}/users/course/delete?email=${email}&courseId=${courseId}`, {
    method: 'DELETE',
    redirect: 'follow'
  })
    .then(response => response.json());

}

// add post to course 
export const addPostToCourse = async (courseId: any, post: any) => {
  return await fetch(`${api_url}/courses/add-post?courseId=${courseId}`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(post),
    redirect: 'follow'
  })
    .then(response => response.json());

}
