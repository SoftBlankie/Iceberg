import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: 16,
  },
  appName: {
    textTransform: 'none',
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  signOut = () => {
    if (typeof this.props.signOut === 'function') {
      this.props.signOut();
      this.setState({ redirect: true });
    }
  };

  render() {
    const { classes } = this.props;
    let isLogged = this.props.loggedIn;

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
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

export default withStyles(styles)(NavBar);
