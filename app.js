const Koa = require('koa')

const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// const session = require('koa-generic-session')
const session = require('koa-session')
const Redis = require('koa-redis')
const passport = require('./config/passport')

const route = require('./routes/index')

// error handler
onerror(app)


app.keys= ['mondora','mall']
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


const conf={
  encode:json=>JSON.stringify(json),
  decode:str=>JSON.parse(str),
  key: 'mondora', prefix: 'mondora:uid'
}
app.use(
  session(
    conf,
    app
  )
)
// app.use(session({key: 'mondora', prefix: 'mondora:uid', store: new Redis()}))

app.use(json())

app.use(passport.initialize())
 // 会在请求周期ctx对象挂载以下方法与属性

  //   ctx.state.user 认证用户
  //   ctx.login(user) 登录用户（序列化用户）
  //   ctx.isAuthenticated() 判断是否认证

  // 这里序列化指的是把用户对象存到session里，反序列化就是反过来，从session里取用户数据成对象

app.use(passport.session())


app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
route.install(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

//  允许跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // 很奇怪的是，使用 * 会出现一些其他问题
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
  await next();
});

module.exports = app
