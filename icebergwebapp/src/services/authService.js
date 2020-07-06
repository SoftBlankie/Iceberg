import axios from 'axios';

export const signupUser = (newUser) => {
  // newUser is supposed to be validated already
  axios.post('http://localhost:1337/api/user/signup', newUser).then((res) => {
    console.log(res);
    console.log(res.data);
  });
};
