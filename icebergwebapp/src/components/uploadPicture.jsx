import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fileInput: {
    display: 'none',
  },
});

class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(events) {
    console.log('file upload happened');
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="upload-picture">
        <input
          accept="image/*"
          className={classes.fileInput}
          id="file"
          type="file"
          onChange={this.handleChange}
        />
        <label htmlFor="file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </div>
    );
  }
}

export default withStyles(styles)(UploadPicture);
