const router = require('koa-router')()
const ResourceController = require('../controller/resource')

router.prefix('/resource')


router.get('/qiniutoken', ResourceController.getQiniuToken)


module.exports = router