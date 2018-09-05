const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', (req, res)=>{
  // 通过 cnode api 和 $_post['accesstoken'] 的值 来完成用户认证
  axios.post(`${baseUrl}/accesstoken`, {accesstoken: req.body.accesstoken})
    .then(result => {
      if(result.status === 200 && result.data.success){
        // 登陆成功则将数据保存到 session 中
        // 这里的赋值是根据 cnode api 返回的数据格式来确定的
        req.session.user = {
          accessToken: req.body.accesstoken,
          loginName: result.data.loginname,
          id: result.data.id,
          avatarUrl: result.data.avatar_url
        }

        console.log('user data from cnode:', req.session.user)

        res.json({
          success:true,
          data: result.data
        })
      }
    })
    .catch(err=>{
        // 如果cnode 返回了错误的响应 err.response (非服务器内部错误)
        if(err.response){
          console.log('err.responst:', err.response)
          res.json({
            success: false,
            data: err.response
          })
        }
        // 否则交给全局的错误处理中间件
        else{
          next(err)
        }
      }
    )
})

module.exports = router
