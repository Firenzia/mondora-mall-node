const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let userTraceSchema = new mongoose.Schema({
    //  关联买家
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    // 行为
    action_type: Number,
    
    //  关联产品
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},

    // 更新时间
    update_time: { type: Date, default: Date.now },

    // 创建时间
    create_time: { type: Date, default: Date.now }
})

var userTraceModel = mongoose.model('Trace', userTraceSchema)

autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
userTraceSchema.plugin(autoIncrement.plugin, {
	model: 'Trace',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

module.exports = userTraceModel