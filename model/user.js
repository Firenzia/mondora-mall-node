const  mongoose  = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');


let userSchema = new mongoose.Schema({ 
    // 昵称   
    nickname: String,

    // 加密密码
    password: String,  

    // 邮箱
    email: String,

    // 七牛云
    avatar_url: String, 

    // 性别
    gender: Boolean,

    // 生日
    birthday: Date,

    // 星座
    constallation: String,

    // 地址
    address: [{type:String}],  // 多个地址
 
    // 更新时间
    update_time: { type: Date, default: Date.now},

   // 创建时间
    create_time: { type: Date, default: Date.now }
})


autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

var UserModel = mongoose.model('User', userSchema)

module.exports = UserModel