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
  Typography: {
    flexGrow: 1,
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
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <Home onClick={this.handleHomeClick}/>
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
