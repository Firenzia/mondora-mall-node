const router = require('koa-router')()
const ProductController = require('../controller/product')


router.prefix('/product')

// query 关联查询
router.get('/list', ProductController.queryProductList)


// query 关联查询
router.get('/', ProductController.queryProductInfo)

// add
router.post('/', ProductController.addProduct)

// modify


// delete


module.exports = router