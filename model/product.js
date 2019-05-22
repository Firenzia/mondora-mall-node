/**
 * 产品模型
 */
const mongoose = require('../db/config.js');
const autoIncrement = require('mongoose-auto-increment');

let productSchema = new mongoose.Schema({
  // 关联店铺
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },

  //价格
  price: {
    type: Number,
    required: true
  },

  // 折扣
  discount: {
    type: Number,
    default: 10
  },

  // 分类 1 百货 2 食物 3 配饰
  category: {
    type: Number,
    required: true
  },

  // 库存
  stock: {
    type: Number,
    default: 0
  },

  // 状态：1 待出售 2 出售中  3已下架
  status: {
    type: Number,
    default: 1
  },

  // 点赞数
  likes: {
    type: Number,
    default: 0
  },

  // 成功交易数
  deal_count: {
    type: Number,
    default: 0
  },

  // 退货数  
  return_count: {
    type: Number,
    default: 0
  },

  // 产品名称
  product_name: {
    type: String,
    required: true,
    validate: /\S+/
  },

  // 产品描述
  description: {
    type: String,
    required: true,
    validate: /\S+/
  },

  // 图片链接
  img_url: [{
    type: String
  }],

  // 更新时间
  update_time: {
    type: Date,
    default: Date.now
  },

  // 创建时间
  create_time: {
    type: Date,
    default: Date.now
  },

  // 删除标记 用户删除时候变成0
  is_active: {
    type: Number,
    default: 1
  }
})


autoIncrement.initialize(mongoose.connection)
// 自增 ID 插件配置
productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});

var ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel