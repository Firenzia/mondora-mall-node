const users = require('./users')
const product = require('./product')

module.exports.install = (app)=>{
    app.use(users.routes(), users.allowedMethods())
    app.use(product.routes(), product.allowedMethods())
}