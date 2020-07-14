import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <Toolbar />
        <Typography variant="h4">Messages</Typography>
      </main>
    );
  }
}

export default withStyles(styles)(Messages);
