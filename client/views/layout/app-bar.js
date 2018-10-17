import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, withTheme} from '@material-ui/core/styles';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';

import {Home, Edit} from '@material-ui/icons';
import {Link} from 'react-router-dom'

const styles = theme => ({
  AppBar: {
    height: '56px'
  },
  ToolBar: {
    height: 56,
    '@media (min-width:0px) and (orientation: landscape)':
      {height: 56, minHeight: 56},
    '@media (min-width:600px)':
      {height: 56, minHeight: 56}
  },
  Link: {
    color: 'inherit',
    '&:hover': {
      color: 'inherit',
    }
  },
  HomeIconWrapper: {
    flexGrow: 1,
    marginRight: 12
  },
  HomeLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  siteName: {
    fontSize: 22,
    fontWeight: 'lighter',
    '&:hover': {
      background: 'none',
    }
  },
  button: {
    margin: theme.spacing.unit * 1,
    background: 'none',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
})

@withTheme()
@withStyles(styles)
class TopBar extends Component {
  handleHomeClick = () => {
    console.log('home icon is clicked')
  }

  handleNewTopicClick = () => {
    console.log('new topic button is clicked')
  }

  handleLoginClick = () => {
    console.log('login button is clicked')
  }

  render() {
    const {classes, theme} = this.props;
    // console.log('theme object:', theme)

    return (
      <Grid container xs={12}>
        <AppBar position="fixed" color="inherit" className={classes.AppBar}>
          <Toolbar className={classes.ToolBar}>
            <span className={classes.HomeIconWrapper}>
              <a href='/' className={classes.HomeLink}>
                <Typography className={classes.siteName}>
                  Node & Us
                </Typography>
              </a>
            </span>
            <Button
              variant="contained"
              mini
              className={classes.button}
            >
              <Edit mini/>
            </Button>
            <Button
              variant='outlined'
              color='default'
              className={classes.button}
              onClick={this.handleLoginClick}
            >
              <span style={{fontWeight:'lighter'}}>Login</span>
            </Button>

          </Toolbar>
        </AppBar>
      </Grid>
    )
  }
}


TopBar.propTypes = {
  history: PropTypes.object.isRequired, //eslint-disable-line
  classes: PropTypes.object.isRequired, //eslint-disable-line
  theme: PropTypes.object.isRequired, //eslint-disable-line
};

export default TopBar
