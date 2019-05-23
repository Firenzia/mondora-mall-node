const ProductModel = require('../model/product')

class ProductController {
  static async addProduct(ctx, next) {

    ctx.body = await new Promise((resolve, reject) => {
      let data = Object.assign(ctx.request.body, {
        shop: ctx.session.passport.user.sid
      })
      var obj = new ProductModel(data)

      obj.save(function (err) {
        if (err) {
          console.log('err', err)
          resolve({
            code: 0,
            msg: '创建商品失败'
          })
        } else {
          resolve({
            code: 1,
            msg: '创建商品成功'
          })
        }
      })

    })
  }

  static async queryProductInfo(ctx, next) {
    ctx.body = await new Promise((resolve, reject) => {
      ProductModel.findById(ctx.request.query.product_id)
        .populate({
          path: 'shop'
        }).exec(function (err, product) {
          if (product) {
            resolve({
              code: 1,
              data: product
            })
          }
          if (err) {
            console.log('err')
            resolve({
              code: 0,
              msg: err
            })
          }
        })
    })
  }

  static async queryProductList(ctx, next) {
    console.log('session', ctx.session)
    // console.log(ctx.session.passport.user)  // { uid: '5ce4c1865a5cfa9e96e59c0e' }
    ctx.body = await new Promise((resolve, reject) => {
      ProductModel.find(null, "product_name description price img_url")
        .populate({
          path: 'shop',
          select: 'shop_name description',
        }).exec(function (err, productList) {
          //   console.log(productList) 
          if (productList) {
            resolve({
              code: 1,
              data: {
                productList
              }
            })
          }
          if (err) {
            console.log('err')
            resolve({
              code: 0,
              msg: err
            })
          }
        })
    })
  }

}



module.exports = ProductController