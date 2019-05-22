const mongoose = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

//每个用户有多条购物记录
let dealSchema = new mongoose.Schema({

  //  关联买家
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  //  关联卖家
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },

  // /发货中/完成订单/退款/
  status: Number,

  // 订单详情
  detail: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    count: {
      type: Number
    },
    memo: {
      type: String
    }
  }],

  // 收货地址
  addr: String,

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


var dealModel = mongoose.model('Deal', dealSchema)



autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
dealSchema.plugin(autoIncrement.plugin, {
  model: 'Deal',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});


module.exports = dealModel