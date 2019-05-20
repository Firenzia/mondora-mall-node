const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let favouriteSchema = new mongoose.Schema({
    user_id: Number,
    product_list: Array,

    update_time: { type: Date},
    create_time: { type: Date, default: Date.now }
})

// 自增 ID 插件配置
favouriteSchema.plugin(autoIncrement.plugin, {
	model: 'Favourite',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

var favouriteModel = mongoose.model('Favourite', favouriteSchema)


module.exports = favouriteModel