const router = require('koa-router')()
const productModel = require('../model/product')

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
router.post('/', async function (ctx, next) {
  
  const result = await new Promise((resolve, reject)=>{
    var obj = new productModel(ctx.request.body)
    obj.createTime = new Date()
    obj.save(function(err){
      if(err) {
        resolve('创建商品失败')
      }else{
        resolve('创建商品成功')
      }
    })

  })
  console.log(result)

  ctx.body = {
    msg:result
  }
})
// modify


// delete


module.exports = router
