// client-entry
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'  // eslint-disable-line
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'mobx-react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import pink from '@material-ui/core/colors/pink';
import lightBlue from '@material-ui/core/colors/lightBlue';

import App from './views/App'
import AppStateClass from './store/app-state'

const root = document.getElementById('root')


// A wrapper component for MUI Client-Side config
const createApp = (Component) => {
  class Main extends React.Component { //eslint-disable-line
    // Remove the server-side injected CSS while client react start working.

    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <Component/>
    }
  }

  return Main
}

// Create a theme instance for MUI
const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  },
});


// generate initialState for Mobx <Provider>
const initialState = window.__INITIAL_STATE__ || {}
delete window.__INITIAL_STATE__


const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppStateClass(initialState.appState)}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component/>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}


render(createApp(App))

// apply webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default  //eslint-disable-line

    render(createApp(NextApp))
  })
}
