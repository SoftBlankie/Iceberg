import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { Component } from 'react';
import * as Yup from 'yup';
import signupImage from '../../media/signupbg.jpg';
import { signupUser } from '../../services/authService.js';
import Filter from 'bad-words';

const styles = (theme) => ({
  root: {
    height: '95vh',
  },
  paper: {
    paddingTop: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  largeIcon: {
    fontSize: '3em',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: '3px',
    marginLeft: theme.spacing(36),
    marginRight: theme.spacing(36),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  image: {
    backgroundImage: 'url(' + signupImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

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
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
    this.filter = new Filter();
  }

  handleSubmit(event) {
    event.preventDefault();
    let newUser = {
      username: this.state.usernameValue,
      email: this.state.emailValue,
      password: this.state.passwordValue,
    };
    if (
      this.state.usernameError === '' &&
      this.state.emailError === '' &&
      this.state.passwordError === '' &&
      this.state.confirmPasswordError === ''
    ) {
      signupUser(newUser);
    }
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

  handleBlur(event, valueName) {
    event.persist();
    let state = this.state;
    switch (valueName) {
      case 'username':
        Yup.string()
          .min(3, 'Username must be 3 characters or more!')
          .max(15, 'Username must be 15 characters or less!')
          .required('Username is required!')
          .validate(event.target.value)
          .then((value) => {
            state.usernameError = '';
            if (this.filter.isProfane(event.target.value)) {
              state.usernameError = 'Keep your username clean.';
            }
            this.setState(state);
          })
          .catch((err) => {
            state.usernameError = err.message;
            this.setState(state);
          });

        break;
      case 'email':
        Yup.string()
          .email('Must be a valid email!')
          .required('Email is required!')
          .validate(event.target.value)
          .then((value) => {
            state.emailError = '';
            this.setState(state);
          })
          .catch((err) => {
            state.emailError = err.message;
            this.setState(state);
          });
        break;
      case 'password':
        Yup.string()
          .min(6, 'Password must be 6 characters or more!')
          .max(100, 'Password must be 100 characters or less!')
          .required('Password is required!')
          .validate(event.target.value)
          .then((value) => {
            state.passwordError = '';
            this.setState(state);
          })
          .catch((err) => {
            state.passwordError = err.message;
            this.setState(state);
          });
        break;
      case 'confirmPassword':
        if (event.target.value !== this.state.passwordValue) {
          state.confirmPasswordError = 'Must match password!';
        } else {
          state.confirmPasswordError = '';
        }
        break;
      default:
        break;
    }
    this.setState(state);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container>
          <CssBaseline />
          <div className={classes.paper}>
            <Box
              boxShadow={20}
              border={1}
              borderColor="secondary.main"
              borderRadius={16}
              className={classes.formContainer}
            >
              <Avatar className={classes.avatar}>
                <SentimentVerySatisfiedIcon className={classes.largeIcon} />
              </Avatar>
              <Typography variant="h5">Join the crew!</Typography>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      label="Username"
                      fullWidth
                      color="secondary"
                      value={this.state.usernameValue}
                      onChange={(e) => this.handleChange(e, 'username')}
                      onBlur={(e) => this.handleBlur(e, 'username')}
                      error={this.state.usernameError !== ''}
                      helperText={this.state.usernameError}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      label="Email"
                      fullWidth
                      color="secondary"
                      onChange={(e) => this.handleChange(e, 'email')}
                      onBlur={(e) => this.handleBlur(e, 'email')}
                      error={this.state.emailError !== ''}
                      helperText={this.state.emailError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      label="Password"
                      fullWidth
                      color="secondary"
                      type="password"
                      className="form-control"
                      value={this.state.passwordValue}
                      placeholder="Password"
                      id="password"
                      onChange={(e) => this.handleChange(e, 'password')}
                      onBlur={(e) => this.handleBlur(e, 'password')}
                      error={this.state.passwordError !== ''}
                      helperText={this.state.passwordError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="filled"
                      label="Confirm Password"
                      fullWidth
                      color="secondary"
                      type="password"
                      className="form-control"
                      value={this.state.confirmPasswordValue}
                      placeholder="Confirm password"
                      id="confirmPassword"
                      onChange={(e) => this.handleChange(e, 'confirmPassword')}
                      onBlur={(e) => this.handleBlur(e, 'confirmPassword')}
                      error={this.state.confirmPasswordError !== ''}
                      helperText={this.state.confirmPasswordError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      type="submit"
                      disabled={
                        !(
                          this.state.username === '' &&
                          this.state.email === '' &&
                          this.state.password === '' &&
                          this.state.confirmPassword === ''
                        ) ||
                        !(
                          this.state.usernameError === '' &&
                          this.state.emailError === '' &&
                          this.state.passwordError === '' &&
                          this.state.confirmPasswordError === ''
                        )
                      }
                      className={classes.submit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(SignupForm);
