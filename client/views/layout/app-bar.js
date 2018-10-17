import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, withTheme} from '@material-ui/core/styles';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
  Button,
} from '@material-ui/core';
import {inject, observer} from 'mobx-react'

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
  HomeIconWrapper: {
    flexGrow: 1,
    marginRight: 12
  },
  Link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    }
  },
  siteName: {
    display: 'inline',
    fontSize: 22,
    fontWeight: 'lighter',
    '&:hover': {
      background: 'none',
    }
  },
  currentTab: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: '1px solid grey',
    display: 'inline',
    fontSize: 20,
    fontWeight: 'lighter',
    '&:hover':
      {background: 'none'}
  },
  button: {
    margin: theme.spacing.unit * 1,
    background:
      'none',
    boxShadow:
      'none',
    [theme.breakpoints.down('xs')]:
      {
        margin: 0,
        paddingLeft:
          0,
        paddingRight:
          0,
      }
    ,
  }
  ,
})

@inject(stores => ({
  topicStore: stores.topicStore
}))
@withTheme()
@withStyles(styles)
@observer
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
    const {
      topicStore,
      topicStore: {topicDetail},
      classes,
      theme
    } = this.props;

    console.log('topicDetail :', topicDetail)

    return (
      <Grid container xs={12}>
        <AppBar position="fixed" color="inherit" className={classes.AppBar}>
          <Toolbar className={classes.ToolBar}>
            <span className={classes.HomeIconWrapper}>
              <Link to='/' className={classes.Link}>
                <Typography component='span' className={classes.siteName}>
                  Node & Us
                </Typography>
              </Link>
              {topicDetail.tab
                ? (
                  <Hidden xsDown>
                    <Link
                      to={`/list/${topicDetail.tab}`}
                      className={classes.Link}
                    >
                      <Typography className={classes.currentTab}>
                        {topicDetail.tab}
                      </Typography>
                    </Link>
                  </Hidden>
                )
                : null
              }
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
              <span style={{fontWeight: 'lighter'}}>Login</span>
            </Button>

          </Toolbar>
        </AppBar>
      </Grid>
    )
  }
}


TopBar.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired, //eslint-disable-line
  history: PropTypes.object.isRequired, //eslint-disable-line
  classes: PropTypes.object.isRequired, //eslint-disable-line
  theme: PropTypes.object.isRequired, //eslint-disable-line
};

export default TopBar
