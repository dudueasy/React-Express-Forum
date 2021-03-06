import React, {Component, Fragment} from 'react'
import {CircularProgress, Paper} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'


const styles = theme => ({
  root: {
    position: 'fixed',
    top: '48px',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.1)'
  },
})

export default withStyles(styles)(({classes}) => (
  <div className={classes.root}>
    <CircularProgress color="primary" size={100} thickness={5}/>
  </div>
))
