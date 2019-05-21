const productModel = require('../model/product')

class ProductController{
    static async addProduct(ctx, next){

        ctx.body = await new Promise((resolve, reject)=>{
            var obj = new productModel(ctx.request.body)
            obj.createTime = new Date()
            obj.save(function(err){
            if(err) {
                console.log('err', err)
                resolve({msg:'创建商品失败'})
            }else{
                resolve({msg:'创建商品成功'})
            }
            })
        
        })
    }

    static async queryProductInfo (ctx, next) {
        ctx.body = await new Promise((resolve, reject)=>{
            productModel.findById(ctx.request.query.product_id, "product_name star likes")
            .populate({
              path: 'shop',
              select: 'shop_name description',
              }).exec(function (err, product) {
              console.log(product) 
               if(product){
                resolve({result : product})
               }
               if(err){
                   console.log('err')
                   resolve(err)
               }
            })
        })
    }

    static async queryProductList (ctx, next) {
        ctx.body = await new Promise((resolve, reject)=>{
            productModel.find(null, "product_name star likes")
            .populate({
              path: 'shop',
              select: 'shop_name description',
              }).exec(function (err, productList) {
            //   console.log(productList) 
               if(productList){
                resolve({result : productList})
               }
               if(err){
                   console.log('err')
                   resolve(err)
               }
            })
        })
    }
    
}



module.exports = ProductController