import axios from 'axios';

export const signupUser = (newUser) => {
  // newUser is supposed to be validated already
  return axios
    .post('http://localhost:1337/api/user/signup', newUser)
    .then((res) => {
      return res.data.error === '';
    });
};

export const loginUser = async (user) => {
  return axios
    .post('http://localhost:1337/api/user/login', user, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data.error === '';
    });
};

export const logoutUser = () => {
  return axios
    .get('http://localhost:1337/api/user/logout', {
      withCredentials: true,
    })
    .then(() => {
      console.log('finished');
      return;
    });
};

export const checkToken = async () => {
  return axios
    .get('http://localhost:1337/api/user/validToken', {
      withCredentials: true,
    })
    .then((res) => {
      return res.data.error === '';
    })
    .catch((err) => {
      console.log(err);
    });
};
