import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MailIcon from '@material-ui/icons/Mail';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    zIndex: 2,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class AppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button component={Link} to={'/questions'}>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary="Questions" />
              </ListItem>
              <ListItem button component={Link} to={'/messages'}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            </List>
            <Divider />
          </div>
          <ListItem button component={Link} to={'/profile'}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(AppDrawer);
