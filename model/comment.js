const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let commentSchema = new mongoose.Schema({
    user_id: Number,    
    content: String,
    product_id: Number,
    star: Number,

    update_time: { type: Date},
    create_time: { type: Date, default: Date.now }
})

// 自增 ID 插件配置
commentSchema.plugin(autoIncrement.plugin, {
	model: 'Comment',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

var commentModel = mongoose.model('Comment', commentSchema)


module.exports = commentModel