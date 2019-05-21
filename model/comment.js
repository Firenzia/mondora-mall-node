const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let commentSchema = new mongoose.Schema({
    //  关联买家
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 

     //  关联产品
     product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
     
    // 评论内容
    content: String,
    
    // 星级
    star: Number,

   // 更新时间
   update_time: { type: Date, default: Date.now},

   // 创建时间
   create_time: { type: Date, default: Date.now }
})

var commentModel = mongoose.model('Comment', commentSchema)




autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
commentSchema.plugin(autoIncrement.plugin, {
	model: 'Comment',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

module.exports = commentModel