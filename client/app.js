// client-entry
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'  // eslint-disable-line
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'mobx-react'
import {MuiThemeProvider, createGenerateClassName} from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider';

import App from './views/App'
import theme from './views/MuiTheme'
import {TopicStore} from './store/store'


const root = document.getElementById('root')


// initialization for MUI
const generateClassName = createGenerateClassName();


// generate initialState for Mobx <Provider>
const initialState = window.__INITIAL_STATE__ || {}
delete window.__INITIAL_STATE__

// create Initial State
// const topicStore = new TopicStore(initialState.topicStore)
const topicStore = new TopicStore({})


const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider
        topicStore={topicStore}
      >
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
      // for server-side-rendering
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
  module.hot.accept('./views/App.js', () => {
    const NextApp = require('./views/App.js').default  //eslint-disable-line

    render(wrapApp(NextApp))
  })
}
