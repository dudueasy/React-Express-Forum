import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import {withRouter} from 'react-router-dom'

import Routes from '../config/router'
import AppBar from './layout/app-bar'
import Container from './layout/container'

@withRouter
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
        <Container>
          <Routes key="routes"/>
        </Container>
      </React.Fragment>
    )
  }
}
