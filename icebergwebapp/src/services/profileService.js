import axios from 'axios';

// avoid telling server where to store for security reasons
export const uploadFile = (file) => {
  const config = {
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
  };
  axios
    .put('/api', data, config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
