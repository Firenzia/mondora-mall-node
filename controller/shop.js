const ShopModel = require('../model/shop')

class ShopController{
    static async addShop(ctx, next){

        ctx.body = await new Promise((resolve, reject)=>{
            var obj = new ShopModel(ctx.request.body)
            obj.createTime = new Date()
            obj.save().then((shop) =>{
                console.log('shop',shop)
                resolve({msg:'创建店铺成功'})
            })
        })
    }
    
}



module.exports = ShopController