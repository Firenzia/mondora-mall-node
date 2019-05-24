const router = require('koa-router')()
const ProductController = require('../controller/product')


router.prefix('/product')

// query 用户侧
router.get('/list', ProductController.queryProductList)

//  query 买家侧
router.get('/lists', ProductController.queryShopProductList)


// query 关联查询
router.get('/', ProductController.queryProductInfo)

// add
router.post('/', ProductController.addProduct)

// modify


// delete


module.exports = router