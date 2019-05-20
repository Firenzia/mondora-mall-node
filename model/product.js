const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let productSchema = new mongoose.Schema({
    //价格
    price: Number,    

    // 折扣
    discount: Number,  

    // 分类
    category_id: Number,  

    // 库存
    stock:{ type: Number, default: 0 }, 
    
    //店铺id
    storeId: Number,       

    // 评分
    star: { type: Number, default: 0 },     
    
    // 状态：出售中 待出售  已下架
    status:String,      
    // 点赞数
    likes:{ type: Number, default: 0 },       
  
     // 成功交易数
    deal_count:Number,  
    
    // 退货数  
    return_count:Number,    

     // 产品名称
    product_name: String,  
    
     // 产品描述
    description: String,  
    
     // 图片链接
    img_url: Array,         

    // 更新时间
    update_time: { type: Date},

    // 创建时间
    create_time: { type: Date, default: Date.now }
})

// 自增 ID 插件配置
productSchema.plugin(autoIncrement.plugin, {
	model: 'Product',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

var productModel = mongoose.model('Product', productSchema)


module.exports = productModel