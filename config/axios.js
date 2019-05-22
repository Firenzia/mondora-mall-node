const axios = require('axios')

const request = axios.create({
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:2000,
  headers:{

  }
})

module.exports = request
