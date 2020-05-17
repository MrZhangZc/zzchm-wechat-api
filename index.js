/*
 * @Descripttion: 入口文件index
 * @version: 0.0.1
 * @Author: zhangzhichao
 * @Date: 2020-05-08 18:57:34
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-17 12:15:27
 */
const Koa = require('koa');
const R = require('ramda');

const { resolve } = require('path');
const r = path => resolve(__dirname, path);

const MIDDLEWARES = ['logger', 'database', 'common', 'router'];

const useMiddleWares = app => {
  return R.map(R.compose(
    R.map(i => i(app)),
    require,
    i => `${r('./app/middlewares')}/${i}`
  ))
}

const app = new Koa();
useMiddleWares(app)(MIDDLEWARES);

const menu = require('./app/wechat/menu');
const wechat = require('./app/wechat');
let client = wechat.getWechat()

async function createMenu() {
  await client.handle('delMenu');
  const menuresult = await client.handle('createMenu', menu);
  console.log({menuresult})
}

createMenu();

module.exports = app;
