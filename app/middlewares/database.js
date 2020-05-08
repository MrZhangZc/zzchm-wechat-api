/*
 * @Descripttion: 数据库中间件
 * @Author: zhangzhichao
 * @Date: 2020-05-09 00:52:21
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 01:04:26
 */

const mongoose = require('mongoose');
const config = require('config');
const database = app => {
  mongoose.set('debug', true);
  mongoose.connect(config.get(mongo.url));

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.get(mongo.url))
  })

  mongoose.connection.on('err', err => {
    __mlogger.error('mongodb连接失败', err.message);
  })

  mongoose.connection.on('open', async ()=> {
    __mlogger.info('成功连接mongodb数据库', mongo.url);
  })
}

module.exports = {
  database
}
