const axios = require('axios')
const queryString = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

// 这个中间件用来代理 cnodejs 接口
module.exports = (req, res, next) => {
  // 初始化用户数据
  const user = req.session.user || {}

  // 根据前端的请求query, 判断一个请求 (API) 是否需要 accesstoken (需要用户登录),
  // 将它添加到请求的查询参数中
  const needAccessToken = req.query.needAccessToken

  // 如果请求的接口需要登录, 而用户没有accesstoken
  if (needAccessToken && !user.accessToken) {
    res.status(401)
    res.json({
        success: false,
        msg: 'need login'
      }
    )
  }

  // 重新构造 query
  const query = Object.assign({}, req.query, {
    accesstoken: needAccessToken && req.method === 'GET' ? user.accessToken : ''
  })


  console.log('query: ', query)

  // 向 Cnode 发起请求, 根据 浏览器请求中的数据来判断
  // method 根据客户端请求中的 method 来决定
  // content-type 要设置成表单数据使用的 content-type

  let requestUrl = `${baseUrl}${req.path}`

  console.log(`request path: ${req.path}`)
  console.log('requestUrl:', requestUrl)

  axios(requestUrl, {
    method: req.method,
    params: query,
    data: queryString.stringify(Object.assign(
      {}, req.body, {
        accesstoken: needAccessToken && req.method === 'POST' ? user.accessToken : ''
      }
    )),
    headers: {'content-type': 'application/x-www-form-urlencoded'},
  }).then(
    result => {
      console.log('user data from cnode:', req.session.user)
      console.log(`request ${requestUrl} successfully`)

      if (result.status === 200) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.json(result.data)
      } else {

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(result.status).json(result.data)
      }
    }
  ).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)

    } else {
      res.status(500).send({
        success: false,
        msg: 'unknown error'
      })
    }
  })
}
