const users = require('./users')
const product = require('./product')
const shop = require('./shop')
const user = require('./user')

module.exports.install = (app) => {
  app.use(users.routes(), users.allowedMethods())
  app.use(product.routes(), product.allowedMethods())
  app.use(shop.routes(), shop.allowedMethods())
  app.use(user.routes(), user.allowedMethods())
}