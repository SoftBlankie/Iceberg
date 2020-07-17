import { CircularProgress, CssBaseline, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { login, logout } from '../actions';
import { checkToken, logoutUser } from '../services/authService';
import Dashboard from './dashboard';
import AppDrawer from './drawer';
import LoginForm from './loginForm';
import Messages from './messages';
import NavBar from './navBar';
import Profile from './profile';
import SignupForm from './signupForm';

const styles = (themes) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
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

  signOut = async () => {
    // update state
    this.props.logout();
    // clear httponly cookie
    await logoutUser();
    console.log('finished clearing');
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
    if (prevState.redirect !== this.state.redirect) {
      const loggedIn = await checkToken();
      loggedIn ? this.props.login() : this.props.logout();
      const state = this.state;
      state.redirect = false;
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

            <Route path="/dashboard">
              {this.props.loggedIn ? <Dashboard /> : <Redirect to="/" />}
            </Route>

            <Route path="/messages">
              {this.props.loggedIn ? <Messages /> : <Redirect to="/" />}
            </Route>

            <Route path="/profile">
              {this.props.loggedIn ? <Profile /> : <Redirect to="/" />}
            </Route>
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
