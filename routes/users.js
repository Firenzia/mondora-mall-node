const router = require('koa-router')()
const student = require('../model/student')

router.prefix('/student')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// query
router.get('/list', async function (ctx, next) {
  
  const result = await new Promise((resolve, reject)=>{
    student.find({}, function(err, student){
        if(student){
          resolve(student)
        }
    })
  })

  ctx.body = {
    result
  }
})

// add
router.post('/', async function (ctx, next) {
  
  const result = await new Promise((resolve, reject)=>{
    var obj = new student(ctx.request.body)
    obj.save(function(err){
      if(err) {
        resolve('创建失败')
      }else{
        resolve('创建成功')
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
