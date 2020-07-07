import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import LoginForm from './components/loginForm/loginForm';
import MainLayout from './components/mainLayout/mainLayout';
import SignupForm from './components/signupForm/signupForm';

const mapStateToProps = (state) => ({
  mapstate: state.mapstate,
});

function App() {
  return (
    <div id="App">
      <MainLayout />
      <Route path="/signup" component={SignupForm} />
      <Route path="/login" component={LoginForm} />
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(App));
