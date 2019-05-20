const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');
//每个用户有一条购物车记录，只做更新不增加
let cartSchema = new mongoose.Schema({
    user_id: Number,    
    shop_id: Number,
    detail: Array,   // 购物车详情
    status: Number ,  // 是否已清空
    create_time: { type: Date, default: Date.now }
})

// 自增 ID 插件配置
cartSchema.plugin(autoIncrement.plugin, {
	model: 'Cart',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

var cartModel = mongoose.model('Cart', cartSchema)


module.exports = cartModel