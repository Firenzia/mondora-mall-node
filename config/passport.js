const  passport = require('koa-passport')
const  LocalStrategy = require('passport-local')
const UserModel  = require('../model/user')
const SellerModel  = require('../model/seller') 



passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if(result!=null){
    // console.log('result.password',result.password, 'password',password)
    if(result.password===password){
      // console.log('匹配')
      return done(null,result)
    }else{
      // console.log('密码错误')
      return done(null,false,'密码错误')
    }
  }else{
    // console.log('用户不存在')
    return done(null,false,'用户不存在')  //done执行的是login里passport.authenticate的回调函数
  }
}))

//  序列化ctx.login()触发  serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function(user,done){
  console.log('serializeUser', {uid:user._id})
  // 返回给客户端的set-cookie
  done(null,{uid:user._id})
})

// 反序列化 从session取出user 请求时，session中存在user时触发
passport.deserializeUser(function(user,done){
  return done(null,user)
})

module.exports = passport
