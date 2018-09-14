const ReactDomServer = require('react-dom/server')
const asyncBoostrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')


// getStoreStete 的返回值: {appState: {count: xx, name: xx}}
const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, item) => {
    return result[item] = stores[item].toJson()
  }, {})
}

module.exports = (bundle, template, req, res)=>{
  return new Promise((resolve,reject)=>{

    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default

    const routerContext = {}

    // default stores = {appState: {count: 0, name: 'apolo',msg:`${this.name}:${this.count}`, add:fn, toJson:fn}}
    let stores = createStoreMap()


    // serverBundle( store, context_for_staticRouter, url_for_staticRouter)
    const app = createApp(stores, routerContext, req.url)

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
      resolve()
    }).catch(
      reject
    )
  })

}
