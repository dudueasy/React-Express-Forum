const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

// html-webpack-plugin 是一个 webpack plugin, 用于在 build 的时候在指定目录生成一个 HTML 文件
const HTMLPlugin = require('html-webpack-plugin')

// 引用通用webpack配置
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

let config = webpackMerge(baseConfig, {
  // 定义入口文件
  entry: {
    // 使用 path.join 来获得绝对路径
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    // 定义输出文件名, 这里使用 webpack 变量, [name] 是入口名, 此处对应 app, [hash]是打包完成的文件的哈希值, 用于和浏览器缓存协作.
    filename: '[name].[hash].js',

    // bundle 输出位置
    path: path.join(__dirname, '../dist'),

    // 定义生产环境下(webpack输出文件), 被引用的静态资源的路径(在使用 webpack-dev-server 时并不生效)
    // 这个设置对于 服务端渲染 很重要
    publicPath: '/public/',
  },
  plugins: [
    new HTMLPlugin({template: path.join(__dirname, '../client/template.html')})
  ]
})

if (isDev) {
  console.log('current env is development')

  // 实现热模块更新的 entry 配置 (将react-hot-loader提供的插件一并打包)
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
// 配置开发环境的常用设置
  config.devServer = {
    // 允许局域网访问
    host: '0.0.0.0',
    port: '8888',
    // 定义 devServer 服务器服务/工作的目录 (设置为和webpack配置中的 output.path 一致即可)
    contentBase: path.join(__dirname, '../dist'),
    // 开启热模块替换 (需要在react app中进行配置, 否则会报错)
    hot: true,
    // 错误信息显示
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    // 启用historyApiFallback, 实现前端路由
    historyApiFallback: {
      index: '/public/index.html'
    },
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
