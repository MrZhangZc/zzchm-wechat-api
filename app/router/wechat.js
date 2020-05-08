/*
 * @Descripttion: 公众号相关路由
 * @Author: zhangzhichao
 * @Date: 2020-05-09 00:06:05
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 00:35:02
 */
const config = require('config');
const sha1 = require('sha1');
const router = require('koa-router')();
router.get('/wechat-hear', async ctx => {
  const token = config.get('wechat.token');
  const {
    signature,
    nonce,
    timestamp,
    echostr
  } = ctx.query;
  const str = [token, timestamp, nonce].sort().join('');
  const sha = sha1(str)

  if(sha === signature) {
    ctx.body = echostr;
  } else {
    __ilogger.error('认证失败');
    ctx.body = 'error'
  }
})

module.exports = router;
