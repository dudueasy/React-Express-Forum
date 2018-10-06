import React, {Component} from 'react'
import {Paper} from '@material-ui/core'
import {WithStyles} from '@material-ui/core/styles'

import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    marginTop: 60
  },
})

const Container = ({classes, children}) => {
  return (
    <Paper elevation={4} className={classes.root}>
      {children}
    </Paper>
  )
}

Container.propTypes = {
  classes: PropTypes.object.isRequired, //eslint-disable-line
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ])
}

export default WithStyles(styles)(Container)
