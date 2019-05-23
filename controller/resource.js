const qiniu = require('qiniu')
const config = require('../config/qiniu')

class ResourceController {

  static async getQiniuToken(ctx, next) {
    console.log('config: ', config)
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 0,
        msg: "用户未登录"
      }
    } else {
      let mac = new qiniu.auth.digest.Mac(config.AK, config.SK);
      let options = {
        scope: config.Bucket,
        expires: 3600 * 24
      };
      let putPolicy = new qiniu.rs.PutPolicy(options);
      let uploadToken = putPolicy.uploadToken(mac);
      console.log('token: ', uploadToken)
      if (uploadToken) {
        ctx.body = {
          code: 1,
          data:{uploadToken}
        }
      } else {
        ctx.body = {
          code: 0
        }
      }
    }
  }


}



module.exports = ResourceController