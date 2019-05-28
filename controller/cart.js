const CartModel = require('../model/cart')

class CartController {
  static async addCart(ctx, next) {
    let seller
    ctx.body = await new Promise((resolve, reject) => {
      let data = Object.assign(ctx.request.body, {user: ctx.session.passport.user.uid})
      var obj = new CartModel(data)
      obj.save().then(async (cart) => {
        console.log('cart', cart)
        resolve({
          code: 1,
          msg: '购物车记录创建成功'
        })
       
      })
    })
    return ctx.login(seller)
  }

  static async queryCartInfo(ctx, next) {
    let result = await  CartModel.find({user: ctx.session.passport.user.uid}, "detail")
    ctx.body = result? {code:1, data:result}:{code:0, msg:'暂无购物车记录'}
  }

  static async updateCartInfo(ctx, next){
    ctx.body = await new Promise( (resolve, reject) =>{
      let updateInfo = ctx.request.body
      CartModel.findOneAndUpdate({user: ctx.session.passport.user.sid}, updateInfo, function (err, cart) {
        console.log('cart', cart, 'error', err)
        if (shop) {
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



module.exports = CartController