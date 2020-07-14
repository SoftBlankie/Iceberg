import React, { Component } from 'react';
import AppDrawer from './drawer';
import NavBar from './navBar';
import { connect } from 'react-redux';
import { logout, login } from '../actions';
import { logoutUser } from '../services/authService';
import {
  Toolbar,
  CircularProgress,
  Fade,
  CssBaseline,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { checkToken } from '../services/authService';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import Messages from './messages';
import Profile from './profile';

const styles = (themes) => ({
  root: {
    display: 'flex',
  },
  centered: {
    position: 'fixed' /* or absolute */,
    top: '50%',
    left: '50%',
  },
});

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, redirect: false };
  }

  signOut = () => {
    // update state
    this.props.logout();
    // clear httponly cookie
    logoutUser();
    this.setState({ loading: true, redirect: true });
  };

  async componentDidMount() {
    const loggedIn = await checkToken();
    loggedIn ? this.props.login() : this.props.logout();
    const state = this.state;
    state.loading = false;
    this.setState(state);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.redirect != this.state.redirect) {
      const loggedIn = await checkToken();
      loggedIn ? this.props.login() : this.props.logout();
      const state = this.state;
      state.loading = false;
      this.setState(state);
    }
  }

  render() {
    const { classes } = this.props;
    let loading = this.state.loading;

    return (
      <div>
        <CssBaseline />
        {loading && (
          <div className={classes.centered}>
            {
              <Fade
                in={loading}
                style={{
                  transitionDelay: loading ? '800ms' : '0ms',
                }}
              >
                <CircularProgress size={70} color="secondary" />
              </Fade>
            }
          </div>
        )}

        {!this.state.loading && (
          <div className={classes.root}>
            <NavBar signOut={this.signOut} loggedIn={this.props.loggedIn} />

            {this.props.loggedIn && (
              <AppDrawer loggedIn={this.props.loggedIn} />
            )}

            <Route
              path="/signup"
              loggedIn={this.props.loggedIn}
              component={SignupForm}
            />
            <Route
              path="/login"
              loggedIn={this.props.loggedIn}
              component={LoginForm}
            />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/messages" component={Messages} />
            <Route path="/profile" component={Profile} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

const mapDispatchToProps = () => {
  return {
    login,
    logout,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withStyles(styles)(MainLayout));
