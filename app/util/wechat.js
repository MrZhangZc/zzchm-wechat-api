/*
 * @Descripttion: 
 * @Author: zhangzhichao
 * @Date: 2020-05-09 10:20:04
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-13 15:32:06
 */

const xml2js = require('xml2js');
const template = require('../wechat-lib/tpl');

const parseXML = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { trim: true }, (err, content) => {
      if (err) reject(err);
      else resolve(content);
    })
  })
}

const formatMesage = result => {
  let message = {};

  if(typeof result === 'object') {
    const keys = Object.keys(result);

    for(let i = 0; i < keys.length;i++) {
      let item = result[keys[i]];
      let key = keys[i];

      if(!(item instanceof Array) || item.length === 0) {
        continue;
      }

      if(item.length === 1) {
        let val = item[0];

        if(typeof val === 'object') {
          message[key] = formatMesage(val)
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];

        for(let j = 0;j < item.length;j++) {
          message[key].push(formatMesage(item[j]));
        }
      }
    }
  }

  return message;
}

const tpl = (content, message) => {
  let type = 'text';
  if(Array.isArray(content)) {
    type = 'news';
  }

  if(!content) {
    content = '暂无回复';
  }

  if(content && content.type) {
    type = content.type;
  }

  let info = Object.assign({}, {
    content: content,
    createTime: new Date().getTime(),
    msgType: type || 'text',
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName
  })

  return template(info);
}

module.exports = {
  parseXML,
  formatMesage,
  tpl
}
