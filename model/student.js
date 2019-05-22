const mongoose = require('../db/config.js');

// 创建数据表模型，该文件的名字，即person，就是数据表的名字
// 下面给 person 表声明两个字段name和age

let studentSchema = new mongoose.Schema({
  name: String,
  job: String,
  age: Number,
  food: String
})

// 通过建 model 给 person 赋予增删改查等读写的功能
var student = mongoose.model('Student', studentSchema)

// var obj = new student({
//     name: 'Bob',
//     age:19,
//     job: 'zookeeper',
//     food:'ice-cream'
// })
// obj.save()

module.exports = student