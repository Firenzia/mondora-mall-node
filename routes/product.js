const router = require('koa-router')()
const productController = require('../controller/product')

router.prefix('/product')

// query
// router.get('/list', async function (ctx, next) {
  
//   const result = await new Promise((resolve, reject)=>{
//     student.find({}, function(err, student){
//         if(student){
//           resolve(student)
//         }
//     })
//   })

//   ctx.body = {
//     result
//   }
// })

// add
router.post('/', productController.addProduct)
// modify


// delete


module.exports = router
