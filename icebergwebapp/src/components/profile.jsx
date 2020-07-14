import React, { Component } from 'react';
import { Toolbar, Typography, Button } from '@material-ui/core';
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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('file change');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Toolbar />
        <Typography variant="h4">Profile</Typography>
        <div className={classes.form}>
          <input
            accept="image/*"
            className={classes.fileInput}
            id="contained-button-file"
            multiple
            type="file"
            onChange={this.handleChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
