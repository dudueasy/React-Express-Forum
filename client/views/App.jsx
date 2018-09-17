import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from '../config/router'
import AppBar from './layout/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <AppBar key="AppBar"/>
        <Routes key="routes"/>
      </React.Fragment>
    )
  }
}
