module.exports.dealStatus = {
    1: "unshipped",  // 待发货
    2: "shipping",   // 已发货
    3: "deal",       // 确认收货
    4: "return"       // 退货
}


module.exports.productStatus = {
    1: "for_sale",  // 待上架
    2: "on_sale",   // 销售中
    3: "sold_out"   // 下架
}

module.exports.productCategory = {
    1: "grocery",  // 百货
    2: "food",   // 食物
    3: "accessory"   // 配饰
}

module.exports.userActionTrace = {
    1: "browse",  // 浏览
    2: "add_favourite",   // 添加收藏夹
    3: "remove_favourite",   // 移除收藏夹
    4: "add_cart", // 添加购物车
    5: "remove_cart", // 移除购物车
    6: "forward", // 转发
}