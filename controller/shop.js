const ShopModel = require('../model/shop')
const SellerModel = require('../model/seller')

class ShopController {
  static async addShop(ctx, next) {
    let seller
    ctx.body = await new Promise((resolve, reject) => {
      let data = Object.assign(ctx.request.body, {seller: ctx.session.passport.user.uid})
      var obj = new ShopModel(data)
      obj.createTime = new Date()
      obj.save().then(async (shop) => {
        console.log('shop', shop)
        seller = await SellerModel.findById(ctx.session.passport.user.uid)
        // 重新设置session 写入sid
        resolve({
          code: 1,
          msg: '店铺创建成功'
        })
       
      })
    })
    return ctx.login(seller)
  }

  static async queryShopInfo(ctx, next) {
    let result =await  ShopModel.findById(ctx.session.passport.user.sid, "description shop_name create_time")
    ctx.body = result? {code:1, data:result}:{code:0, msg:'未创建店铺'}
  }

  static async updateShopInfo(ctx, next){
    ctx.body = await new Promise( (resolve, reject) =>{
      ShopModel.findByIdAndUpdate(ctx.session.passport.user.sid, ctx.request.body, null, function (err, shop) {
        console.log('shop', shop, 'error', err)
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



module.exports = ShopController