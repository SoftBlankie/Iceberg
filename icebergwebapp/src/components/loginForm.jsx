import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { Alert } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import Filter from 'bad-words';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/index.js';
import { loginUser } from '../services/authService.js';

const styles = (theme) => ({
  root: {
    alignSelf: 'center',
    width: '40%',
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
    // backgroundColor: '#FFFFFF',
    borderWidth: '3px',
    width: '100%',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  rightAlign: {
    float: 'right',
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      usernameValue: '',
      passwordValue: '',
      expireValue: true,
      usernameTouched: false,
      passwordTouched: false,
      loggedIn: false,
      openAlert: false,
    };
    this.filter = new Filter();
  }

  async handleSubmit(event) {
    event.preventDefault();
    let newUser = {
      username: this.state.usernameValue,
      password: this.state.passwordValue,
      expire: this.state.expireValue,
    };
    if (this.state.usernameValue !== '' && this.state.passwordTouched !== '') {
      let loggedIn = await loginUser(newUser);
      let state = this.state;

      if (loggedIn) {
        state.loggedIn = true;
        this.setState(state);
        this.props.login();
      } else {
        state.openAlert = true;
        this.setState(state);
      }
    }
  }

  handleChange(event, valueName) {
    let state = this.state;
    switch (valueName) {
      case 'username':
        state.usernameValue = event.target.value;
        break;
      case 'password':
        state.passwordValue = event.target.value;
        break;
      case 'expire':
        state.expireValue = !event.target.checked;
        break;
      default:
        break;
    }
    this.setState(state);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    let state = this.state;
    state.openAlert = false;
    this.setState(state);
  };

  render() {
    const { classes } = this.props;

    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.root}>
        <Toolbar />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.openAlert}
          autoHideDuration={60000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            <Typography variant="body1">Incorrect credentials!</Typography>
          </Alert>
        </Snackbar>
        <div className={classes.paper}>
          <Box
            boxShadow={20}
            border={1}
            borderColor="secondary.main"
            borderRadius={16}
            className={classes.formContainer}
          >
            <Avatar className={classes.avatar}>
              <EmojiPeopleIcon className={classes.largeIcon} />
            </Avatar>
            <Typography variant="h5">Welcome back!</Typography>
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
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="filled"
                    label="Password"
                    fullWidth
                    color="secondary"
                    type="password"
                    value={this.state.passwordValue}
                    onChange={(e) => this.handleChange(e, 'password')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => this.handleChange(e, 'expire')}
                        name="expire"
                      />
                    }
                    label="Remember me (1 year)"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    type="submit"
                    disabled={
                      this.state.usernameValue === '' ||
                      this.state.passwordValue === ''
                    }
                    className={classes.submit}
                  >
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    component={Link}
                    to={'/signup'}
                    className={classes.rightAlign}
                    color="inherit"
                    variant="body2"
                  >
                    Don't have an account?
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};

const mapDispatchToProps = () => {
  return { login };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withStyles(styles)(LoginForm));
