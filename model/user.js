const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');


let userSchema = new mongoose.Schema({ 
    nickname: String,
    password: String,  // 加密
    email: String,
    avatar_url: String, // 七牛云
    gender: Boolean,
    birthday: Date,
    constallation: String,
    address: Array,  // 多个地址
 
    create_time: { type: Date, default: Date.now }
})

var userModel = mongoose.model('User', userSchema)

autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

module.exports = userModel