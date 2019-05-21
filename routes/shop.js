const router = require('koa-router')()
const ShopController = require('../controller/shop')

router.prefix('/shop')


// add
router.post('/', ShopController.addShop)

// delete


module.exports = router
