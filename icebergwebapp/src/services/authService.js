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

export const checkUniqueUsername = async (username) => {
  return axios
    .post('http://localhost:1337/api/user/uniqueUsername', {
      username: username,
    })
    .then((res) => {
      return res.data.error === '';
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkUniqueEmail = async (email) => {
  return axios
    .post('http://localhost:1337/api/user/uniqueEmail', { email: email })
    .then((res) => {
      return res.data.error === '';
    })
    .catch((err) => {
      console.log(err);
    });
};
