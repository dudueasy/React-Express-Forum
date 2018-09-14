const ReactDomServer = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const express = require('express')
const serveFavicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')


// load data from .env to process.env
require('dotenv').config();

// 初始化
let isDev = process.env.NODE_ENV === "development"
let app = express()
let port = process.env.NODE_SERVER_PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  // name refer to sid-cookie name
  name: 'tid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000*60*60*24 }
}))

app.use(serveFavicon(path.join(__dirname, '../favicon.ico')))
app.use((req, res,next)=>{console.log(req.path); next()})
app.use('/api/user', require('../util/handle-login'))
app.use('/api', require('../util/proxy'))

// 定义非开发环境下的代码逻辑
if (!isDev) {

  // 这里引用的是 webpack 输出的 bundle, 由于 ES6 module 的特性, 这里需要指定 require 的特定变量(default), 否则会报错.
  let serverEntry = require('../dist/server-entry').default

  // 引用 dist/index 文件作为模板 (由 webpack.config.client.js 生成).
  let template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

  // 定义对静态资源的响应,
  app.use('/public', express.static(path.join(__dirname, '../dist')));

  // 对首页/入口文件的响应
  app.get("/", (req, res, next) => {

    //使用 ReactDomServer.renderToString 将 react 组件(js代码)转换为静态页面字符串
    let appString = ReactDomServer.renderToString(serverEntry)

    // 使用 bundle 静态页面字符替换模板中的占位符
    template = template.replace('<app></app>', appString)
    // console.log(template)

    res.end(template)
  })
}

// 定义开发环境下的逻辑
else {
  const devStatic = require('../util/dev-static')
  devStatic(app)

}


app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
