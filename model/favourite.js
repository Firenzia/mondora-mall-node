const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let favouriteSchema = new mongoose.Schema({
    //  关联买家
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 

    //  关联产品
    product_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],

    // 更新时间
    update_time: { type: Date, default: Date.now},

    // 创建时间
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