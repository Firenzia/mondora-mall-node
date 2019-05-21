const router = require('koa-router')()
const shopModel = require('../model/shop')

router.prefix('/shop')


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
    var obj = new shopModel(ctx.request.body)
    obj.save(function(err){
      if(err) {
        resolve('店铺创建失败')
      }else{
        resolve('店铺创建成功')
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
