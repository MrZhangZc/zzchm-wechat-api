/*
 * @Descripttion: 
 * @Author: zhangzhichao
 * @Date: 2020-05-09 01:40:23
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 02:53:39
 */
const request = require('request-promise');

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential',
}

class Wechat {
  constructor(opts) {
    this.opts = Object.assign({}, opts);
    this.addID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.fetchAccessToken();
  }

  async request (options) {
    options = Object.assign({}, options, {json: true});
    console.log({options})
    try {
      const reponse = await request(options);
      return reponse;
    } catch (error) {
      __ilogger.error('获取access_token失败');
    }
  }

  async fetchAccessToken () {
    let data = await this.getAccessToken();

    if(!this.isValidAccessToken(data)) {
      data =  await this.updateAccessToken();
    }

    await this.saveAccessToken(data);

    return data;
  }

  async updateAccessToken () {
    const url = api.accessToken + '&appid=' + this.addID + '&secret=' + this.appSecret;

    const data = await this.request({url: url});
    const now = (new Date().getTime());
    const expiresIn = now + (data.expires_in - 20) * 1000;

    data.expires_in = expiresIn;

    return data;
  }

  isValidAccessToken (data) {
    if(!data || !data.access_token || !data.expires_in) {
      return false;
    }

    const expiresIn = data.expires_in;
    const now = (new Date().getTime());

    return now < expiresIn;
  }
}

module.exports = Wechat;
