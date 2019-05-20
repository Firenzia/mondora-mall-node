const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let userTraceSchema = new mongoose.Schema({
    user_id:{ type: Number, default: 0 },
    action_type: Number,
    related_product_id: { type: Number, default: 0 },

    create_time: { type: Date, default: Date.now }
})

// 自增 ID 插件配置
userTraceSchema.plugin(autoIncrement.plugin, {
	model: 'Trace',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

var userTraceModel = mongoose.model('Trace', userTraceSchema)


module.exports = userTraceModel