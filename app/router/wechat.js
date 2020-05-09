/*
 * @Descripttion: 公众号相关路由
 * @Author: zhangzhichao
 * @Date: 2020-05-09 00:06:05
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 10:29:40
 */
const config = require('config');
const router = require('koa-router')();
const reply = require('../wechat/reply');

const wechatMiddle = require('../wechat-lib/middleware');

router.all('/wechat-hear', wechatMiddle(config.get('wechat'), reply));

module.exports = router;
