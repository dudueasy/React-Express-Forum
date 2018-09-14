// server-entry
import React from 'react'
import {StaticRouter} from 'react-router-dom'
import {Provider, useStaticRendering} from 'mobx-react'

import {createStoreMap} from './store/store'
import App from './views/App'

useStaticRendering(true)
require('source-map-support').install()

// server-bundle 是一个函数 可以接收 store 作为 provider 传递的数据
export default (stores, routerContext, url) => (
  // stores = {store: xxx, ...}
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App/>
    </StaticRouter>
  </Provider>
)

export {createStoreMap}
