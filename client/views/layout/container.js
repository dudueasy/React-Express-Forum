import React, {Component, Fragment} from 'react'
import {Paper} from '@material-ui/core'
import {WithStyles} from '@material-ui/core/styles'

import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    margin: 24,
    marginTop: 80
  },
})

const Container = ({classes, children}) => {
  return (
    <Fragment>
      <Paper elevation={4} className={classes.root}>
        {children}
      </Paper>
    </Fragment>
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
