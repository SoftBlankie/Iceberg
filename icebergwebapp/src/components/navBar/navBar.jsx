import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: 16,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  appName: {
    textTransform: 'none',
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { login: true };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Button
              component={Link}
              to={'/'}
              disableElevation
              disableRipple
              className={classes.appName}
              color="inherit"
            >
              <Typography className={classes.title} variant="h6">
                Iceberg
              </Typography>
            </Button>

            <section className={classes.rightToolbar}>
              <Button component={Link} to={'/login'} color="inherit">
                Login
              </Button>
              <Button component={Link} to={'/signup'} color="inherit">
                Sign Up
              </Button>
            </section>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
