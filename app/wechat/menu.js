/*
 * @Descripttion: 
 * @Author: zhangzhichao
 * @Date: 2020-05-17 10:21:34
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-17 12:19:09
 */ 
const config = require('config');
const appId = config.get('miniprogram.appID');

module.exports = {
  'button': [{
    'name': 'zzc',
    'sub_button': [{
      'name': '天气',
      'type': 'miniprogram',
      'url': 'https://blog.lihailezzc.com/',
      'appid': appId,
      "pagepath":"pages/weather/weather"
    }, {
      'name': '计算器',
      'type': 'miniprogram',
      'url': 'https://blog.lihailezzc.com/',
      'appid': appId,
      "pagepath":"pages/calculater/calculater"
    }]
  }, {
    'name': '❤️',
    'sub_button': [{
      "type":"view",
      "name":"知乎热榜top10",
      "url":"https://blog.lihailezzc.com/"
    }, {
      "type":"view",
      "name":"微博热榜top10",
      "url":"https://blog.lihailezzc.com/"
    }]
  }, {
    'name': 'hm',
    'sub_button': [{
      "type":"view",
      "name":"mmmmmmmmmmm",
      "url":"https://blog.lihailezzc.com/"
    }, {
      "type":"view",
      "name":"ccccccccccc",
      "url":"https://blog.lihailezzc.com/"
    }]
  }]
}
