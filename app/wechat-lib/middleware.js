/*
 * @Descripttion: 微信消息中间件
 * @Author: zhangzhichao
 * @Date: 2020-05-09 09:59:12
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-13 15:29:46
 */
const sha1 = require('sha1');
const wechatUtil = require('../util').wechatUtil;
const getRowBody = require('raw-body');
 module.exports = function (opts, reply) {
   return async function wechatMiddle(ctx, next) {
    const token = opts.token;
      const {
        signature,
        nonce,
        timestamp,
        echostr
      } = ctx.query;
      const str = [token, timestamp, nonce].sort().join('');
      const sha = sha1(str)
      
      if (ctx.method == 'GET') {
        if(sha === signature) {
          __ilogger.info('认证成功');
          ctx.body = echostr;
        } else {
          __ilogger.error('认证失败');
          ctx.body = 'error'
        }
      } else if(ctx.method === 'POST') {
        if(sha !== signature) {
          ctx.body = 'Field';
          return false;
        }

        const data = await getRowBody(ctx.req, {
          length: ctx.length,
          limit: '1mb',
          encoding: ctx.charset
        })

        const content = await wechatUtil.parseXML(data);

        const message = wechatUtil.formatMesage(content.xml);
        ctx.weixin = message;

        await reply.apply(ctx, [ctx, next]);

        const replyBody = ctx.body;
        console.log('reply', replyBody)
        const msg = ctx.weixin;
        const xml = wechatUtil.tpl(replyBody, msg);

        console.log('xml', xml);

        ctx.status = 200;
        ctx.type = 'application/xml';
        ctx.body = xml
      }
   }
 }
