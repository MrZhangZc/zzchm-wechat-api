/*
 * @Descripttion: 
 * @Author: zhangzhichao
 * @Date: 2020-05-09 01:40:23
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-17 12:22:45
 */
const request = require('request-promise');

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential',
  temporary: {
    upload: base + 'media/upload?',
    fetch: base + 'media/get?'
  },
  permanent: {
    upload: base + 'material/add_material?',
    uploadNews: base + 'material/add_news?',
    uploadNewsPic: base + 'media/uploadimg?',
    fetch: base + 'material/get_material?',
    del: base + 'material/del_material?',
    update: base + 'material/update_news?',
    count: base + 'material/get_materialcount?',
    batch: base + 'material/batchget_material?'
  },
  tag: {
    create: base + 'tags/create?',
    fetch: base + 'tags/get?',
    update: base + 'tags/update?',
    del: base + 'tags/delete?',
    fetchUsers: base + 'user/tag/get?',
    batchTag: base + 'tags/members/batchtagging?',
    batchUnTag: base + 'tags/members/batchuntagging?',
    getTagList: base + 'tags/getidlist?'
  },
  user: {
    remark: base + 'user/info/updateremark?',
    info: base + 'user/info?',
    batchInfo: base + 'user/info/batchget?',
    fetchUserList: base + 'user/get?',
    getBlackList: base + 'tags/members/getblacklist?',
    batchBlackUsers: base + 'tags/members/batchblacklist?',
    batchUnblackUsers: base + 'tags/members/batchunblacklist?'
  },
  menu: {
    create: base + 'menu/create?',
    get: base + 'menu/get?',
    del: base + 'menu/delete?',
    addCondition: base + 'menu/addconditional?',
    delCondition: base + 'menu/delconditional?',
    getInfo: base + 'get_current_selfmenu_info?'
  },
  ticket: {
    get: base + 'ticket/getticket?'
  }
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

  async handle (operation, ...args) {
    const tokenData = await this.fetchAccessToken()
    const options = this[operation](tokenData.access_token, ...args)
    const data = await this.request(options)

    return data
  }

  createMenu (token, menu) {
    const url = api.menu.create + 'access_token=' + token;

    return {
      method: 'POST',
      url,
      body: menu
    };
  }

  getMenu (token) {
    const url = api.menu.get + 'access_token=' + token;

    return {
      url
    };
  }

  delMenu (token) {
    const url = api.menu.del + 'access_token=' + token;

    return {
      url
    };
  }

  getCurrentMenuInfo (token) {
    const url = api.menu.getInfo + 'access_token=' + token;

    return {
      url
    };
  }
}

module.exports = Wechat;
