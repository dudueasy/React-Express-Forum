const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge(baseConfig, {
  // 定义构建目标为 nodejs 环境
  target: 'node',
  // 定义入口文件
  entry: {
    // 使用 path.join 来获得绝对路径
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    // bundle 文件名
    filename: 'server-entry.js',

    // bundle 输出位置
    path: path.join(__dirname, '../dist'),

    // 定义生产环境下(webpack输出文件), 页面中的静态资源的路径前缀(在开发环境并不生效)
    // 这个设置对于 服务端渲染 很重要
    publicPath: '/public/',

    // bundle 中的模块引用使用 commonjs 规范来处理 (适用于 nodejs 环境)
    libraryTarget: "commonjs2"
  },
})
