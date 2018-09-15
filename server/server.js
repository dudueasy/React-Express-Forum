const fs = require('fs')
const path = require('path')
const express = require('express')
const serveFavicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const serverRender = require('../util/server-render')

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
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

app.use(serveFavicon(path.join(__dirname, '../favicon.ico')))
app.use((req, res, next) => {
  console.log(req.path);
  next()
})
app.use('/api/user', require('../util/handle-login'))
app.use('/api', require('../util/proxy'))

app.use((error, req, res, next) => {
  console.log(error)
})

// 定义非开发环境下的代码逻辑
if (!isDev) {
  let serverEntry = require('../dist/server-entry')

  // 引用 dist/index 文件作为模板 (由 webpack.config.client.js 生成).
  let template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8')

  // 定义对静态资源的响应,
  app.use('/public', express.static(path.join(__dirname, '../dist')));

  // 对首页/入口文件的响应
  app.get("*", (req, res, next) => {
    serverRender(serverEntry, template, req, res)
  }).catch(error => {
    next(error)
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
