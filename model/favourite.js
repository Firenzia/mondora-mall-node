const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let favouriteSchema = new mongoose.Schema({
    user_id: Number,
    
    // 产品id list
    product_list: Array, 

    update_time: { type: Date},
    create_time: { type: Date, default: Date.now }
})


var favouriteModel = mongoose.model('Favourite', favouriteSchema)




autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
favouriteSchema.plugin(autoIncrement.plugin, {
	model: 'Favourite',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

module.exports = favouriteModel