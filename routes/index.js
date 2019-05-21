const users = require('./users')
const product = require('./product')
const shop = require('./shop')

module.exports.install = (app)=>{
    app.use(users.routes(), users.allowedMethods())
    app.use(product.routes(), product.allowedMethods())
    app.use(shop.routes(), shop.allowedMethods())
}