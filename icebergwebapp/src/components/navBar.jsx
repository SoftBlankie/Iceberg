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
import { connect } from 'react-redux';
import { logout } from '../actions';
import { logoutUser } from '../services/authService';

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
  signOut = () => {
    // update state
    this.props.logout();
    // clear httponly cookie
    logoutUser();
  };

  render() {
    const { classes } = this.props;
    let isLogged = this.props.loggedIn;
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
              {!isLogged && (
                <div>
                  <Button component={Link} to={'/login'} color="inherit">
                    Login
                  </Button>
                  <Button component={Link} to={'/signup'} color="inherit">
                    Sign Up
                  </Button>
                </div>
              )}
              {isLogged && (
                <div>
                  <Button component={Link} to={'/dashboard'} color="inherit">
                    Dashboard
                  </Button>
                  <Button onClick={this.signOut} color="inherit">
                    Sign Out
                  </Button>
                </div>
              )}
            </section>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

const mapDispatchToProps = () => {
  return {
    logout,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withStyles(styles)(NavBar));
