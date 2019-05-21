const router = require('koa-router')()
const productController = require('../controller/product')
const productModel = require('../model/product')
const shopModel = require('../model/shop')

router.prefix('/product')

// query 关联查询
router.get('/list', async function (ctx, next) {
  // const result = await new Promise((resolve, reject)=>{
    // productModel.findOne().populate('shop_id').exec(function (err, product) {
    //   console.log('i found shop name is:',product.shop_id.shop_name)        
    //   resolve(product)
    // })
    const productList = await new Promise((resolve, reject)=>{
      productModel.find({}, function(err, product){
          if(product){
            resolve(product)
          }
      })
    })
    // let result = []
    var promise = productModel.populate(productList,{path:'shop_id'}, function(err, products){
      console.log('products:', products)
      // resolve(products)
    })
    // var test = await promise
    // console.log('test', test)
 

    ctx.body = {
      result:122
    }
})

// add
router.post('/', productController.addProduct)
// modify


// delete


module.exports = router
