const ShopModel = require('../model/shop')
const SellerModel = require('../model/seller')

class ShopController {
  static async addShop(ctx, next) {

    ctx.body = await new Promise((resolve, reject) => {
      let data = Object.assign(ctx.request.body, {seller: ctx.session.passport.user.uid})
      var obj = new ShopModel(data)
      obj.createTime = new Date()
      obj.save().then(async (shop) => {
        console.log('shop', shop)
        let seller = await SellerModel.findById(ctx.session.passport.user.uid)
        // 重新设置session 写入sid
        resolve({
          code: 1,
          msg: '店铺创建成功'
        })
        return ctx.login(seller)
      })
    })
  }

  // return Passport.authenticate('seller', async function (err, user, info, status) {



      // ctx.body = { }
  //    return ctx.login(user)

  // }(ctx, next)

}



module.exports = ShopController