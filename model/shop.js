const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let shopSchema = new mongoose.Schema({
    seller_id: Number,    
    shop_name: String,
    description: String , 

    update_time: { type: Date},
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

var shopModel = mongoose.model('Shop', shopSchema)

module.exports = shopModel