/*
 * @Descripttion: 其它中间件
 * @Author: zhangzhichao
 * @Date: 2020-05-08 23:19:52
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-08 23:21:22
 */

 const bodyParser = require('koa-body');

 const addbodyParse = app => {
   app.use(bodyParser());
 }

 module.exports = {
   addbodyParse,
 }
