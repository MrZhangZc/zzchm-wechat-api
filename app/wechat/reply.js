/*
 * @Descripttion: 回复策略
 * @Author: zhangzhichao
 * @Date: 2020-05-09 10:30:01
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 15:01:13
 */

 const tip = '欢迎来到zzchm\n' + '点击<a href="http:\\blog.lihailezzc.com">zzchm</a>'
 module.exports = async (ctx, next) => {
   const message = ctx.weixin;
   console.log({message});

   if (message.MsgType === 'event') {
      if (message.Event === 'subscribe') {
        ctx.body = tip;
      } else if (message.Event === 'unsubscribe') {
        console.log('去关了', message.FromUserName);
      } else if (message.Event === 'LOCATION') {
        console.log('23213123')
        ctx.body = message.Latitude + message.Longitude + message.Precision;
      }
   } else if (message.MsgType === 'text') {
      ctx.body = message.Content;
   } else if (message.MsgType === 'image') {
      ctx.body = {
        type: 'image',
        mediaId: message.MediaId
      }
   } else if (message.MsgType === 'voice') {
     ctx.body = {
       type: 'voice',
       mediaId: message.MediaId
     }
   } else if (message.MsgType === 'video') {
    ctx.body = {
      title: message.ThumbMediaId,
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label;
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title: message.Title,
      description: message.Description,
      picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/XZSjEA3Ws5GWu5YMnrHeMdQia7eaxuoJB3SKAY3tzcytzLhRfF5ibJgHNNdMIPCSGt3YGLNTVrq1rSI5h33jeJ2A/0',
      url: message.Url
    }];
  }
 }
