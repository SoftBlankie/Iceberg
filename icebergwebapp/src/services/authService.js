import axios from 'axios';

export const signupUser = (newUser) => {
  // newUser is supposed to be validated already
  return axios
    .post(process.env.REACT_APP_API_URL + '/user/signup', newUser)
    .then((res) => {
      return res.data.error === '';
    });
};

export const loginUser = async (user) => {
  console.log(process.env.REACT_APP_API_URL);
  return axios
    .post(process.env.REACT_APP_API_URL + '/user/login', user, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data.error === '';
    });
};

export const logoutUser = () => {
  return axios
    .get(process.env.REACT_APP_API_URL + '/user/logout', {
      withCredentials: true,
    })
    .then(() => {
      return;
    });
};

export const checkToken = async () => {
  return axios
    .get(process.env.REACT_APP_API_URL + '/user/validToken', {
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
    .post(process.env.REACT_APP_API_URL + '/user/uniqueUsername', {
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
    .post(process.env.REACT_APP_API_URL + '/user/uniqueEmail', {
      email: email,
    })
    .then((res) => {
      return res.data.error === '';
    })
    .catch((err) => {
      console.log(err);
    });
};
