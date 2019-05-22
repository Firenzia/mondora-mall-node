const router = require('koa-router')()
const UserController = require('../controller/user')

router.prefix('/user')



// 登录
router.post('/login', UserController.login)

// 登出
router.post('/logout', UserController.logout)

// 查询用户信息
router.get('/info', UserController.getUserInfo)


//  修改用户信息
router.put('/info', UserController.updateUserInfo)

module.exports = router
