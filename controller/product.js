const productModel = require('../model/product')


const addProduct = async (ctx, next) =>{

    const result = await new Promise((resolve, reject)=>{
        var obj = new productModel(ctx.request.body)
        obj.createTime = new Date()
        obj.save(function(err){
        if(err) {
            resolve('创建商品失败')
        }else{
            resolve('创建商品成功')
        }
        })
    
    })
    console.log(result)
    
    ctx.body = {
        msg:result
    }
}

module.exports.addProduct = addProduct