const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config();

let config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
  },
  plugins: [
    new HTMLPlugin({template: path.join(__dirname, '../client/template.html')}),
    new webpack.DefinePlugin({
      'process.env.API_BASE': JSON.stringify(`${process.env.HOST_NAME}:${process.env.NODE_SERVER_PORT}`),
    }),
  ],
});

if (isDev) {
  console.log('current env is development');
  config.devtool = "#cheap-module-eval-source-map";
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js'),
    ],
  };
  config.devServer = {
    host: '0.0.0.0',
    port: process.env.DEV_SERVER_PORT,
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true,
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html',
    },
    proxy: {
      '/api': `http://localhost:${process.env.NODE_SERVER_PORT}`,
    },
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
