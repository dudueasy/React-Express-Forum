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

import {Home} from '@material-ui/icons';

const styles = {
  AppBar: {
    height: '56px'
  },
  ToolBar: {
    height: 56,
    '@media (min-width:0px) and (orientation: landscape)':
      {height: 56, minHeight: 56},
    '@media (min-width:600px) and ':
      {height: 56, minHeight: 56}
  },
  Typography: {
    flexGrow: 1,
  },
  HomeIcon: {
    marginLeft: -24
  },

};

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
    console.log('theme object:', theme)

    return (
      <Grid container xs={12}>
        <AppBar position="fixed" color="inherit" className={classes.AppBar}>
          <Toolbar className={classes.ToolBar}>
            <IconButton size="small" color="inherit" aria-label="Menu">
              <Home className={classes.HomeIcon} onClick={this.handleHomeClick}/>
            </IconButton>
            <Typography
              className={classes.Typography}
              variant="title"
              color="inherit"
            >
              NodeUs
            </Typography>
            <Button onClick={this.handleNewTopicClick} raised color="primary">
              New Topic
            </Button>
            <Button onClick={this.handleLoginClick}>
              Login
            </Button>

          </Toolbar>
        </AppBar>
      </Grid>
    )
  }
}


TopBar.propTypes = {
  classes: PropTypes.object.isRequired, //eslint-disable-line
  theme: PropTypes.object.isRequired, //eslint-disable-line
};

export default TopBar
