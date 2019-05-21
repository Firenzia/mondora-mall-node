/**
 * 店铺模型
 */
const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let shopSchema = new mongoose.Schema({ 
    //  关联卖家
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller'},   
    
    // 店铺名称
    shop_name: String,

    // 店铺描述
    description: String , 
    
    // 更新时间
    update_time: { type: Date, default: Date.now},

    // 创建时间
    create_time: { type: Date, default: Date.now }
})



autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置

shopSchema.plugin(autoIncrement.plugin, {
  	model: 'Shop',
  	field: 'id',
  	startAt: 1,
  	incrementBy: 1,
  });

var ShopModel = mongoose.model('Shop', shopSchema)

module.exports = ShopModel