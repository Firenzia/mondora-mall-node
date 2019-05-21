const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

//每个用户有多条购物记录
let dealSchema = new mongoose.Schema({
    user_id: Number,    
    shop_id: Number,
    status: Number ,  // /发货中/完成订单/退款/
    detail: Array, //[{product-id，count, memo}],
    addr: String , // 收货地址

    update_time: { type: Date},
    create_time: { type: Date, default: Date.now }
})


var dealModel = mongoose.model('Deal', dealSchema)



autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
dealSchema.plugin(autoIncrement.plugin, {
	model: 'Deal',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});


module.exports = dealModel