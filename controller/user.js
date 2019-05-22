
const  UserModel =  require('../model/user')
const  Passport =  require('../config/passport')
const request = require('../config/axios')



// signup  signin  verify   exit   getUser


class UserController{
    static async login(ctx, next) {
         // 未验证ctx.session是 { passport: {} }
        return Passport.authenticate('local', async function(err, user, info, status) {
          if (err) {
            ctx.body = {
              code: -1,
              msg: err
            }
          } else {
            if (user) {
              ctx.body = {
                code: 0,
                msg: '登录成功',
                user
              }
               return ctx.login(user)
            } else {
            //   ctx.body = {
            //     code: 1,
            //     msg: info  //用户不存在
            //   }
              // 场景1 密码错误 
              if(info === '密码错误'){
                 ctx.body = {
                    code: 1,
                    msg: info  
                }
                return
              }
            //  场景2 用户不存在 创建用户 再调用登录接口 
              ctx.body = await new Promise((resolve)=>{
                var obj = new UserModel(ctx.request.body)  
                obj.save().then(user =>{
                    if(user){
                        request.post('/user/login', ctx.request.body).then(result =>{
                          if(result.data.code === 0){
                            resolve({
                                code: 0,
                                msg: '登录成功',
                                user
                              })
                          }else{
                            resolve({
                                code: -1,
                                msg: result.msg
                              })
                          }
                        }).catch(
                          err =>{
                            resolve({
                                code:-1,
                                msg:err
                            })
                          }
                          
                        )        
                    }
                })
              })
             
            }
          }
        })(ctx, next)
    }

    static async logout(ctx, next){
        // 清除之前的cookie
        await ctx.logout()
        if (!ctx.isAuthenticated()) {
            console.log('登出成功')
            ctx.body = {
            code: 0
            }
        } else {
            console.log('登出异常')
            ctx.body = {
                code: -1
            }
        }
    }

    static async getUserInfo(ctx, next){
        if (!ctx.isAuthenticated()){
            ctx.body ={
                code:-1,
                msg:"请登录"
            }
        }else{
            ctx.body = await new Promise((resolve, reject)=>{
                UserModel.findById(ctx.session.passport.user.uid, "username gender address", (err, user)=>{
                    if(user){
                        resolve({code:0 ,data:user})
                    }else{
                        resolve({code:-1, msg:err})
                    }
                })
            })
        }
    }
    
    static async updateUserInfo(ctx, next){

        if (!ctx.isAuthenticated()) {
            ctx.body = {
                code: 0,
                msg:"请登录"
            }
        } else {
            ctx.body = await new Promise(resolve=>{
                UserModel.findByIdAndUpdate(ctx.session.passport.user.uid, ctx.request.body, null, function(err,user){
                    console.log('user',user,'error',err)
                    if(user){
                        resolve({
                            code:1,
                            msg:'修改成功'
                        })
                    }else{
                        resolve({
                            code:0,
                            msg:'修改失败'
                        })
                    }
                })
            })
        }
       

    }
}



module.exports = UserController