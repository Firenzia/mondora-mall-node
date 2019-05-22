const mongoose = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

//每个用户有一条购物车记录，只做更新不增加
let ratingSchema = new mongoose.Schema({
  //  关联买家
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  //  关联产品
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },

  // 订单号 
  trade_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  },

  //  评分
  rating: Number,

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


var cartModel = mongoose.model('Cart', ratingSchema)

autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
ratingSchema.plugin(autoIncrement.plugin, {
  model: 'Cart',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

module.exports = cartModel