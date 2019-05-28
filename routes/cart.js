const router = require('koa-router')()
const CartController = require('../controller/cart')

router.prefix('/cart')


// add
router.post('/', CartController.addCart)

//  query
router.get('/info', CartController.queryCartInfo)



module.exports = router