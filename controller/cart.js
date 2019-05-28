const CartModel = require('../model/cart')
const ProductModel = require('../model/product')
const request = require('../config/axios')

class CartController {
  static async addCart(ctx, next) {
    // 查询是否有记录
    let carts = await CartModel.find({
      user: ctx.session.passport.user.uid
    })

    if (carts.length === 0) {
      ctx.body = await new Promise((resolve, reject) => {
        let data = Object.assign(ctx.request.body, {
          user: ctx.session.passport.user.uid
        })
        var obj = new CartModel(data)
        obj.save().then(async (cart) => {
          console.log('cart', cart)
          resolve({
            code: 1,
            msg: '购物车记录创建成功'
          })

        })
      })
    } else {
      ctx.body = await new Promise((resolve, reject) => {
        let updateProduct = ctx.request.body.detail[0]

        let orginalCartDetail = [...carts[0].detail]

        let isProductAlreadyIn = false
        for (let item of orginalCartDetail) {
          if (item.product == updateProduct.product) {
            item.count += updateProduct.count
            isProductAlreadyIn = true
            // console.log('产品已存在，更新条目', item.count)
            break
          }
        }
        if (!isProductAlreadyIn) {
          orginalCartDetail.push(updateProduct)
          // console.log('新增产品')
        }


        carts[0].update({
          detail: orginalCartDetail
        }, function (err, cart) {
  
          if (cart) {
            resolve({
              code: 1,
              msg: '修改购物车成功'
            })
          } else {
            resolve({
              code: 0,
              msg: '修改购物车失败'
            })
          }
        })
      })

    }

  }

  static async queryCartInfo(ctx, next) {
    let result = await CartModel.findOne({
      user: ctx.session.passport.user.uid
    }, "detail")

    if(result){
      
      let res = {...result}
      console.log('res',res)
      for(let product of result.detail){
        let productInfo = await ProductModel.findById(product.product,"product_name img_url")
        product.meta = productInfo
      }
      
    }
    ctx.body = result ? {
      code: 1,
      data: result
    } : {
      code: 0,
      msg: '暂无购物车记录'
    }
  }



}



module.exports = CartController