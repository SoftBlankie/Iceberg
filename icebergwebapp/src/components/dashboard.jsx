import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    let state = this.state;
    state.value = newValue;
    this.setState(state);
  }

  render() {
    return <div></div>;
  }
}

export default Dashboard;
