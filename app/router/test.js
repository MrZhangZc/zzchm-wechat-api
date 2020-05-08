/*
 * @Descripttion: router test
 * @version: 0.0.1
 * @Author: zhangzhichao
 * @Date: 2020-05-08 19:53:02
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-08 23:07:38
 */
const router = require('koa-router')();

router.get('/zzchm', async ctx => {
  ctx.body = 'zzchm';
})

module.exports = router;
