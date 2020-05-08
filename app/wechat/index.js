/*
 * @Descripttion: 
 * @Author: zhangzhichao
 * @Date: 2020-05-09 02:02:37
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 02:55:23
 */

const mongoose = require('mongoose');
const config = require('config');
const Wechat = require('../wechat-lib');

const Token = mongoose.model('Token');

const wechatConfig = {
  wechat: {
    appID: config.get('wechat.appID'),
    appSecret: config.get('wechat.appSecret'),
    token: config.get('wechat.token'),
    getAccessToken: async () => await Token.getAccessToken(),
    saveAccessToken: async data => await Token.saveAccessToken(data)
  }
}

const getWechat = () => {
  const wechatClient = new Wechat(wechatConfig.wechat);

  return wechatClient;
}

getWechat();

module.exports = {
  getWechat
}
