import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard';
import LoginForm from './components/loginForm';
import NavBar from './components/navBar';
import SignupForm from './components/signupForm';

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

function App() {
  return (
    <div id="App">
      <NavBar />
      <Route path="/signup" component={SignupForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(App));
