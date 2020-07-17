import { Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import UploadPicture from './uploadPicture';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Toolbar />
        <Typography variant="h4">Profile</Typography>
        <div id="profileform">
          <UploadPicture />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
