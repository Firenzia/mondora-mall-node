const UserModel = require('../model/user')
const Passport = require('../config/passport')
const request = require('../config/axios')

// signup  signin  verify   exit   getUser
class UserController {
  static async auth(ctx, next) {

    ctx.body = ctx.isAuthenticated() ? {
      code: 1,
      msg: "用户已登陆",
      username: ''
    } : {
      code: 0,
      msg: "用户未登陆"
    }
    console.log('auth is called', ctx.isAuthenticated())
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 0,
        msg: "用户未登陆"
      };
      return
    }

    ctx.body = await new Promise(resolve => {
      UserModel.findByIdAndUpdate(ctx.session.passport.user.uid, ctx.request.body, null, function (err, user) {
        if (user) {
          resolve({
            code: 1,
            msg: '用户已登陆',
            data: {
              username: user.username
            }
          })
        }
      })
    })
  }

  static async login(ctx, next) {
    // 未验证ctx.session是 { passport: {} }
    return Passport.authenticate('local', async function (err, user, info, status) {
      // 场景 1 通过验证
      if (user) {
        ctx.body = {
          code: 1,
          msg: '登录成功'
        }
        return ctx.login(user)
      }

      // 场景2 密码错误 
      if (info === 'password_error') {
        ctx.body = {
          code: 0,
          msg: "密码错误"
        }
      }
      //  场景3 用户不存在 创建用户 再调用登录接口 
      if (info === 'user_not_exist') {
        ctx.body = await new Promise((resolve) => {
          new UserModel(ctx.request.body).save().then(user => {
            if (user) {
              request.post('/user/login', ctx.request.body).then(result => {
                if (result.data.code === 1) {
                  resolve({
                    code: 1,
                    msg: '登录成功'
                  })
                } else {
                  resolve({
                    code: 0,
                    msg: result.msg
                  })
                }
              }).catch(
                err => {
                  resolve({
                    code: 0,
                    msg: err
                  })
                }

              )
            }
          })
        })
      }

      // 场景4 验证异常
      if (err) {
        ctx.body = {
          code: 0,
          msg: err
        }
      }
    })(ctx, next)
  }

  static async logout(ctx, next) {
    // 清除之前的cookie
    await ctx.logout()
    if (!ctx.isAuthenticated()) {
      console.log('登出成功')
      ctx.body = {
        code: 1,
        msg: '登出成功'
      }
    } else {
      console.log('登出异常')
      ctx.body = {
        code: 0,
        msg: "登出异常"
      }
    }
  }

  static async getUserInfo(ctx, next) {
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 0,
        msg: "用户未登录"
      }
    } else {
      ctx.body = await new Promise((resolve, reject) => {
        UserModel.findById(ctx.session.passport.user.uid, "username gender address", (err, user) => {
          if (user) {
            resolve({
              code: 1,
              data: user
            })
          } else {
            resolve({
              code: 0,
              msg: err
            })
          }
        })
      })
    }
  }

  static async updateUserInfo(ctx, next) {

    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 0,
        msg: "请登录"
      }
    } else {
      ctx.body = await new Promise(resolve => {
        UserModel.findByIdAndUpdate(ctx.session.passport.user.uid, ctx.request.body, null, function (err, user) {
          console.log('user', user, 'error', err)
          if (user) {
            resolve({
              code: 1,
              msg: '修改成功'
            })
          } else {
            resolve({
              code: 0,
              msg: '修改失败'
            })
          }
        })
      })
    }


  }
}



module.exports = UserController