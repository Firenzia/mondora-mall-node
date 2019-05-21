const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

//每个用户有一条购物车记录，只做更新不增加
let ratingSchema = new mongoose.Schema({
    user_id: Number,    
    product_id: Number,
    rating: Number,

    // 订单号 
    trade_no: Number,  
    create_time: { type: Date, default: Date.now }
})


var cartModel = mongoose.model('Cart', ratingSchema)

autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
ratingSchema.plugin(autoIncrement.plugin, {
	model: 'Cart',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

module.exports = cartModel
