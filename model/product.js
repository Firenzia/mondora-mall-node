const  mongoose  = require('../db/config.js');


let productSchema = new mongoose.Schema({
    price: Number,    //价格
    discount: Number,  // 折扣
    categoryId: Number,  // 分类
    stock:Number,         // 库存
    storeId: Number,       //店铺id

    star: Number,         // 评分
    status:String,        // 状态：出售中 待出售  已下架
    likes: Number,        // 点赞数
  
    dealCount:Number,     // 成功交易数
    returnCont:Number,    // 退货数

    productName: String,    // 产品名称
    description: String,    // 产品描述
    createTime: Date,        // 创建时间
    imgUrl: String          // 图片链接
})

var productModel = mongoose.model('Product', productSchema)


module.exports = productModel