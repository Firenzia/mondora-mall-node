const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../model/user')
const SellerModel = require('../model/seller')
const ShopModel = require('../model/shop')



passport.use('user', new LocalStrategy(async function (username, password, done) {
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if (result != null) {
    // console.log('result.password',result.password, 'password',password)
    if (result.password === password) {
      // console.log('匹配')
      return done(null, result)
    } else {
      // console.log('密码错误')
      return done(null, false, 'password_error')
    }
  } else {
    // console.log('用户不存在')
    return done(null, false, 'user_not_exist') //done执行的是login里passport.authenticate的回调函数
  }
}))


passport.use('seller', new LocalStrategy(async function (username, password, done) {
  console.log('卖家策略判断')
  let where = {
    username
  };
  let result = await SellerModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      console.log('匹配到卖家')
      return done(null, result)
    } else {
      console.log('卖家密码错误')
      return done(null, false, 'password_error')
    }
  } else {
    console.log('卖家不存在')
    return done(null, false, 'seller_not_exist') //done执行的是login里passport.authenticate的回调函数
  }
}))

//  序列化ctx.login()触发  serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(async function (user, done) {

  console.log('serializeUser', user)
  let cookie = {
    uid: user._id
  }
  if (user.account_type === 2) {
    console.log('卖家登录') // 如果登录的是卖家，session 存卖家id 和店铺id
    let result = await ShopModel.findOne({
      seller: user._id
    })
    Object.assign(cookie, {
      sid: result._id
    })
    console.log(cookie)
  } else {
    console.log('买家登录')
  }
  // 返回给客户端的set-cookie
  done(null, cookie)
})

// 反序列化 从session取出user 请求时，session中存在user时触发
passport.deserializeUser(function (user, done) {
  return done(null, user)
})

module.exports = passport