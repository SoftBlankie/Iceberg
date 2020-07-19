import axios from 'axios';

// avoid telling server where to store for security reasons
export const uploadFile = (file) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    },
  };
  console.log(file);
  let formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  axios
    .put('/api/profile/upload', formData, config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
