const router = require('koa-router')()
const ShopController = require('../controller/shop')

router.prefix('/shop')


// add
router.post('/', ShopController.addShop)

//  query
router.get('/info', ShopController.queryShopInfo)

// update
router.put('/info', ShopController.updateShopInfo)


module.exports = router