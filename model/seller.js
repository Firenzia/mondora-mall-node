const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let sellerSchema = new mongoose.Schema({
    seller_id: Number,    
    nickname: String,
    password: String,  // 加密
    email: String,
    avatar_url: String, // 七牛云
    shop_address: String, // 店铺地址 
    shippment_address: String, // 发货地址

    update_time: { type: Date},
    create_time: { type: Date, default: Date.now }
})

// 自增 ID 插件配置
sellerSchema.plugin(autoIncrement.plugin, {
	model: 'Seller',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

var sellerModel = mongoose.model('Seller', sellerSchema)


module.exports = sellerModel