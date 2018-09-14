// client-entry
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'  // eslint-disable-line
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'mobx-react'
import AppStateClass from './store/app-state'

import App from './views/App'

const root = document.getElementById('root')

const initialState = window.__INITIAL_STATE__ || {}
delete window.__INITIAL_STATE__

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppStateClass(initialState.appState)}>
        <BrowserRouter>
          <Component/>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

// apply webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default  //eslint-disable-line
    render(NextApp)
  })
}
