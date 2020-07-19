import React, { Component } from 'react';
import { Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactCrop from 'react-image-crop';
import { uploadFile } from '../services/profileService';

import 'react-image-crop/dist/ReactCrop.css';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fileInput: {
    display: 'none',
  },
  cropPopup: {
    position: 'absolute',
    left: '0%',
    top: '0%',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    zIndex: '9999',
  },
  cropContainer: {
    border: '2px solid',
    borderColor: theme.palette.background.default,
    display: 'flex',
    flexWrap: 'wrap',
    width: '60%',
    top: '20%',
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    padding: '50px',
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
  },
  reactCrop: {
    marginBottom: '30px',
  },
  marginRight: {
    marginRight: '20px',
  },
});

class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSrc: null,
      crop: {
        unit: 'px', // default, can be 'px' or '%'
        aspect: 1 / 1,
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleChange(event) {
    if (event.target.files[0].size > 2097152) {
      // bigger than 2Mb
      return;
    }
    this.setState({ fileSrc: URL.createObjectURL(event.target.files[0]) });
  }

  handleCancel(event) {
    this.setState({ fileSrc: null });
  }

  async handleDone(event) {
    // first we send the datafile to server using axios
    await uploadFile(this.state.croppedFile);
  }

  getCroppedImg(image, crop) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob((blob) => {
      fd.set('a', blob, 'cropped_' + this.state.fileSrc);
      const fd = new FormData();
      this.setState({ croppedFile: fd.get('a') });
      console.log(this.state.croppedFile);
    });
  }

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  render() {
    const { classes } = this.props;
    const fileSrc = this.state.fileSrc;
    const crop = this.state.crop;
    return (
      <div id="upload-picture">
        {fileSrc && (
          <Paper elevation={24} className={classes.cropPopup}>
            <div className={classes.cropContainer}>
              <ReactCrop
                className={classes.reactCrop}
                src={fileSrc}
                crop={crop}
                ruleOfThirds
                circularCrop
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
              <Button
                className={classes.marginRight}
                variant="contained"
                color="primary"
                onClick={this.handleDone}
              >
                Done
              </Button>
              <Button
                onClick={this.handleCancel}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </Paper>
        )}
        <input
          accept="image/*"
          className={classes.fileInput}
          id="file"
          type="file"
          onChange={this.handleChange}
        />
        <label htmlFor="file">
          <Button variant="contained" color="secondary" component={'span'}>
            Upload
          </Button>
        </label>
      </div>
    );
  }
}

export default withStyles(styles)(UploadPicture);
