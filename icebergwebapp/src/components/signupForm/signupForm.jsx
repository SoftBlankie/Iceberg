import React, { Component } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';
import { signupUser } from '../../services/authService.js';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      usernameValue: '',
      emailValue: '',
      passwordValue: '',
      confirmPasswordValue: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let newUser = {
      username: this.state.usernameValue,
      email: this.state.emailValue,
      password: this.state.passwordValue,
    };
    signupUser(newUser);
  }

  handleChange(event, valueName) {
    let state = this.state;
    switch (valueName) {
      case 'username':
        state.usernameValue = event.target.value;
        break;
      case 'email':
        state.emailValue = event.target.value;
        break;
      case 'password':
        state.passwordValue = event.target.value;
        break;
      case 'confirmPassword':
        state.confirmPasswordValue = event.target.value;
        break;
      default:
        break;
    }
    this.setState(state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            type="text"
            className="form-control"
            value={this.state.usernameValue}
            placeholder="Username"
            id="username"
            onChange={(e) => this.handleChange(e, 'username')}
          />
          <FormHelperText id="component-helper-text">
            This will be what people will know you by
          </FormHelperText>
        </FormControl>

        <div className="form-group">
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(e) => this.handleChange(e, 'email')}
            />
            <FormHelperText id="component-helper-text">
              Your email is safe with us!
            </FormHelperText>
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              className="form-control"
              value={this.state.passwordValue}
              placeholder="Password"
              id="password"
              onChange={(e) => this.handleChange(e, 'password')}
            />
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl>
            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
            <Input
              type="password"
              className="form-control"
              value={this.state.confirmPasswordValue}
              placeholder="Confirm password"
              id="confirmPassword"
              onChange={(e) => this.handleChange(e, 'confirmPassword')}
            />
          </FormControl>
        </div>
        <Button
          color="primary"
          variant="outlined"
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default SignupForm;
