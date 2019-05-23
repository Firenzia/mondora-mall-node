const router = require('koa-router')()
const SellerController = require('../controller/seller')

router.prefix('/seller')

// 检验是否登陆态
router.get('/auth', SellerController.auth)

// 登录
router.post('/login', SellerController.login)

// 登出
router.post('/logout', SellerController.logout)

// 查询用户信息
router.get('/info', SellerController.getSellerInfo)


//  修改用户信息
router.put('/info', SellerController.updateUserInfo)

module.exports = router