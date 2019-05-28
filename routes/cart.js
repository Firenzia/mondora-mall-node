const router = require('koa-router')()
const CartController = require('../controller/cart')

router.prefix('/cart')


// add
router.post('/', CartController.addCart)

//  query
router.get('/info', CartController.queryCartInfo)

// update
router.put('/info', CartController.updateCartInfo)


module.exports = router