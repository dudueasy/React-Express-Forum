const fs = require('fs')
const path = require('path')
const express = require('express')
const serveFavicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

// load data from .env to process.env
require('dotenv').config();

// 初始化
let app = express()
let port = process.env.NODE_SERVER_PORT || 8888

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
  console.log('request url:', req.url);
  next()
})
app.use('/api/user', require('../util/handle-login'))
app.use('/api', require('../util/proxy'))


// 定义非开发环境下的代码逻辑

// 定义对静态资源的响应,
app.use('/public', express.static(path.join(__dirname, '../dist')));



app.use((error, req, res, next) => {
  console.log(error)
})


app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
