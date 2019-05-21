
===============Query=======================

Query.prototype.populate()
Parameters
path «Object|String» 需要做表关联的字段路径，或者包含所有参数的对象
[select] «Object|String» 表关联查询要选择的字段
[model] «Model» 表关联的 model 。如果没有指定，将以 Schema 中 ref 字段为名称查找 model 进行关联。
[match] «Object» population 查询的条件
[options] «Object» population 查询的选项 (sort 等)
Returns:
«Query» this

## demo
Kitten.find().populate({
    path: 'owner'
  , select: 'name'
  , match: { color: 'black' }
  , options: { sort: { name: -1 }}
}).exec(function (err, kittens) {
  console.log(kittens[0].owner.name) // Zoopa
})

// alternatively
Kitten.find().populate('owner', 'name', null, {sort: { name: -1 }}).exec(function (err, kittens) {
  console.log(kittens[0].owner.name) // Zoopa
})


=============Document========================
Document.prototype.save()
Returns:
«Promise» Promise


Document.prototype.populate()
Parameters
[path] «String|Object» The path to populate or an options object
[callback] «Function» When passed, population is invoked
Returns:
«Document» this

////
  //   const productList = await new Promise((resolve, reject)=>{
  //     productModel.find({}, function(err, product){
  //         if(product){
  //           resolve(product)
  //         }
  //     })
  //   })

  //   await new Promise((resolve, reject)=>{

  //   productModel.populate(productList,{path:'shop_id'}, function(err, products){
  //     console.log('products:', products)
  //     resolve(products)
  //     ctx.body = {
  //       result:products
  //     }
  //   })

  //  })

  //  let data  = await productModel.find().populate('shop_id').exec(function (err, kittens) {
  //     console.log(kittens) // Zoopa
  //     ctx.body = {
  //       result : kittens
  //     }
  //   })


 productModel.findById("5ce38a805a5cfa9e96e53a62",(err, result)=>{
      console.log('result:', result)
      if(err){
           console.log(err)
        }
     })
  todo  ctx.request.query 前端请求参数