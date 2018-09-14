// 这个脚本在开发环境下处理对 '/' 和 '/public' 的请求. 用于实现服务端渲染时的热模块替换.
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const path = require('path')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const asyncBoostrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')

const serverConfig = require('../build/webpack.config.server')

// part1: 通过 axios (http请求访问webpack devServer) 来动态获取开发服务器/内存中的 template 文件
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// part2: 创建一个函数 getModuleFromString , 通过 module api 和 vm 模块创建新模块, 接收 bundle 字符串和模文件名来生成一个 nodejs 模块
const getModuleFromString = (bundle, require, filename, dirname) => {
  const NativeModule = require('module')
  let functionWrapper = NativeModule.wrap(bundle)
  let module = {exports: {}}
  let vm = require('vm')

  let result = vm.runInThisContext(functionWrapper, {
    filename: filename,
    displayErrors: true,
  })
  // functionWrapper.call(module.exports, module.exports,require, module, filename, dirname )
  result.call(module.exports, module.exports, require, module, filename, dirname)
  return module
}


// part3: 用内存中的 bundle 数据 创建 webpack 模块
// 初始化一个 MemoryFileSystem 对象, 使用内存作为bundle输出的文件系统, 提高bundle的读写速度
const mfs = new MemoryFs

// 初始化一个 webpack compiler
const serverCompiler = webpack(serverConfig)
// 指定 webpack compiler 的输出文件系统
serverCompiler.outputFileSystem = mfs

// 初始化 serverBundle 对象, createStoreMap 函数
let serverBundle, createStoreMap

// 通过serverCompiler.watch来监听 entry 文件变化, 实时地更新bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err

  // 输出webpack stats信息
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  // 根据配置文件获得 服务端bundle 的路径
  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)

  // 使用 MemoryFs api 来读取内存中的 webpack server-entry bundle (字符串)
  let bundle = mfs.readFileSync(bundlePath, 'utf-8')


  console.log('bundlePath:', bundlePath)
  // console.log(`bundle:`, bundle)

// 将内存中的 bundle 转换为一个模块

  // const m = getModuleFromString(bundle, 'server-entry.js')
  const m = getModuleFromString(bundle, require, path.join(__dirname, 'server-entry.js'), __dirname)

  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

// getStoreStete 的返回值: {appState: {count: xx, name: xx}}
const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, item) => {
    return result[item] = stores[item].toJson()
  }, {})
}

// part4: 获取模板并用模块替换占位符
// 接收的参数是一个 express 应用
module.exports = function (app) {

  // 使用 proxy 中间件来代理对静态资源的请求, 让运行在 8888 端口的 webpack devServer 来响应静态资源
  app.use('/public', proxy({target: 'http://localhost:8888'}))

  app.get('*', (req, res) => {
    getTemplate().then(template => {

      const routerContext = {}

      // default stores = {appState: {count: 0, name: 'apolo',msg:`${this.name}:${this.count}`, add:fn, toJson:fn}}
      let stores = createStoreMap()

      // serverBundle( store, context_for_staticRouter, url_for_staticRouter)
      const app = serverBundle(stores, routerContext, req.url)

      asyncBoostrap(app).then(() => {

        // 这里的内容会在 app 组件中 asyncBoostrap 函数执行完毕后才开始执行.

        // staticRouter 会根据 req.url 动态地渲染匹配的组件.
        // 如果渲染的是 <Redirect> 那么 <Redirect> 会向 routerContext 插入 url 属性.
        if (routerContext.url) {
          // res.status(302).setHeader('Location',routerContext.url)
          // res.end()
          res.redirect(302, routerContext.url)
          return
        }

        // state = {appState: {count:xx, name:xxx}}
        let state = getStoreState(stores)
        const content = ReactDomServer.renderToString(app)


        // 设置 <header> SEO
        const { Helmet }= require('react-helmet')
        const helmet = Helmet.renderStatic();

        // 向前端页面插入 组件, state 数据以及 helmet
        let html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
          helmet: helmet
        })

        res.send(html)
      })
    })
  })
}
