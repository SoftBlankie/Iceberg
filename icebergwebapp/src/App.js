import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import MainLayout from './components/mainLayout';

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

function App() {
  return (
    <div id="App">
      <Route path="/" component={MainLayout} />
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(App));
