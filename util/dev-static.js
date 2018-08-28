const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const path = require('path')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../build/webpack.config.server')

// part1: 通过 axios (http请求访问webpack devServer) 来动态获取开发服务器/内存中的 template 文件
const getTemplate = ()=>{
  return new Promise((resolve, reject)=>{
    axios.get('http://localhost:8888/public/index.html')
      .then(res=>{
         resolve(res.data)
      })
      .catch(reject)
  })
}


// part2: 用内存中的 bundle 数据 创建模块
// 初始化一个 MemoryFileSystem 对象, 使用内存作为bundle输出的文件系统, 提高bundle的读写速度
const mfs = new MemoryFs

// 初始化一个 webpack compiler
const serverCompiler = webpack(serverConfig)
// 指定 webpack compiler 的输出文件系统
serverCompiler.outputFileSystem = mfs

// 初始化 serverBundle 对象
let serverBundle

// 通过serverCompiler.watch来监听 entry 文件变化, 实时地更新bundle
serverCompiler.watch({},(err, stats)=>{
  if(err) throw err

  // 输出webpack stats信息
  stats = stats.toJson()
  stats.errors.forEach(err=> console.log(err))
  stats.warnings.forEach(warn=> console.log(warn))

  // 根据配置文件获得 服务端bundle 的路径
  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)

  // 使用 MemoryFs api 来读取内存中的 bundle (字符串)
  let bundle = mfs.readFileSync(bundlePath, 'utf-8')
  console.log('bundlePath:' , bundlePath)
  // console.log(`bundle:`, bundle)

// 将内存中的 bundle 转换为一个模块
  // 通过module的构造方法来创建一个新的module
  const Module = module.constructor
  let m = new Module()
  // 使用 Module._complie() 来生成模块, 第一个参数是 bundle 字符串, 第二个参数是模块/文件名
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})


// part3: 获取模板并用模块替换占位符
// 接收的参数是一个 express 应用
module.exports = function (app) {

  // 使用 proxy 中间件来代理对静态资源的请求, 让webpack devServer 来响应静态资源
  app.use('/public', proxy({target: 'http://localhost:8888'})
  )

  app.get('/',(req,res)=>{
    getTemplate().then(template =>{
      let content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<app></app>', content))
    })
  })
}



