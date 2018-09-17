// client-entry
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'  // eslint-disable-line
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'mobx-react'
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider';

import App from './views/App'
import AppStateClass from './store/app-state'

const root = document.getElementById('root')


// initialization for MUI
const theme = createMuiTheme(
  {
    palette: {
      Primary: {main: '#9E9E9E'},
      Secondary: {main: '#607D8B'},
    },
  },
);
const generateClassName = createGenerateClassName();


// generate initialState for Mobx <Provider>
const initialState = window.__INITIAL_STATE__ || {}
delete window.__INITIAL_STATE__


const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppStateClass(initialState.appState)}>
        <BrowserRouter>

          <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <Component/>
            </MuiThemeProvider>
          </JssProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

const wrapApp = (Component) => {
  class Main extends React.Component {
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

render(wrapApp(App))

// apply webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default  //eslint-disable-line

    render(wrapApp(NextApp))
  })
}
