/*
 * @Descripttion: 日志中间件
 * @Author: zhangzhichao
 * @Date: 2020-05-08 23:17:21
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-08 23:18:50
 */
const log4js = require('koa-log4')

const config = require('config')

const logConfig = config.get('log4.config')
const format = config.get('log4.format')

log4js.configure(logConfig)

global.__ilogger = log4js.getLogger('info')

const logger = log4js.getLogger('http')

const addLog = app => {
  app.use(log4js.koaLogger(logger, { level: log4js.levels.INFO, format: format }))
}

module.exports = {
  addLog
}
