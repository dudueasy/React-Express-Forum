// server-entry
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {Provider, useStaticRendering} from 'mobx-react';
import JssProvider from 'react-jss/lib/JssProvider';
import {MuiThemeProvider} from '@material-ui/core/styles';

import App from './views/App';
import theme from './views/MuiTheme';

useStaticRendering(true);
require('source-map-support').install();


// server-bundle 是一个函数 可以接收 store 作为 provider 传递的数据
export default function createApp(stores, routerContext, url, MUIConfig = {}) {
  const {
    sheetsRegistry, generateClassName, sheetsManager,
  } = MUIConfig;

  // stores = {store: xxx, ...}
  return (
    <Provider {...stores}>
      <StaticRouter context={routerContext} location={url}>

        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <App/>

          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </Provider>
  );
}
