/*
 * @Descripttion: 入口文件index
 * @version: 0.0.1
 * @Author: zhangzhichao
 * @Date: 2020-05-08 18:57:34
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 01:04:55
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

module.exports = app;
