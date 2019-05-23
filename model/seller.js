const mongoose = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let sellerSchema = new mongoose.Schema({

  // 昵称   
  username: String,

  // 加密密码
  password: String,

  // 邮箱
  email: String,

  // 七牛云
  avatar_url: String,

  // 店铺地址 
  shop_address: String,

  // 发货地址
  shippment_address: String,

  // 账号类型
  account_type: {
    type: Number,
    default: 2
  },

  // 更新时间
  update_time: {
    type: Date,
    default: Date.now
  },

  // 创建时间
  create_time: {
    type: Date,
    default: Date.now
  }
})



var sellerModel = mongoose.model('Seller', sellerSchema)



autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
sellerSchema.plugin(autoIncrement.plugin, {
  model: 'Seller',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

module.exports = sellerModel