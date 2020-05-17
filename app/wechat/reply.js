/*
 * @Descripttion: 回复策略
 * @Author: zhangzhichao
 * @Date: 2020-05-09 10:30:01
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-17 12:21:18
 */
const mongoose = require("mongoose");
const Heros = mongoose.model("Hero");
const tip =
  "欢迎来到一直懒鸭的幸福生活公众号\n" +
  "发送英雄姓名或昵称即可获取相关背景故事呦";
module.exports = async (ctx, next) => {
  const message = ctx.weixin;

  if (message.MsgType === "event") {
    if (message.Event === "subscribe") {
      ctx.body = tip;
    } else if (message.Event === "unsubscribe") {
      console.log("去关了", message.FromUserName);
    } else if (message.Event === "LOCATION") {
      ctx.body = message.Latitude + message.Longitude + message.Precision;
    }
  } else if (message.MsgType === "text") {
    const hero = await Heros.findOne({
      alias: message.Content,
    });
    if (hero) {
      ctx.body = [
        {
          title: `${hero.name}  背景故事`,
          description: "hm睡前小故事",
          picUrl: hero.img,
          url: `http://story.lihailezzc.com/#/hero/${hero.heroId}`,
        },
      ];
    } else {
      ctx.body = message.Content;
    }
  } else if (message.MsgType === "image") {
    ctx.body = {
      type: "image",
      mediaId: message.MediaId,
    };
  } else if (message.MsgType === "voice") {
    ctx.body = {
      type: "voice",
      mediaId: message.MediaId,
    };
  } else if (message.MsgType === "video") {
    ctx.body = {
      title: message.ThumbMediaId,
      type: "video",
      mediaId: message.MediaId,
    };
  } else if (message.MsgType === "location") {
    ctx.body =
      message.Location_X + " : " + message.Location_Y + " : " + message.Label;
  } else if (message.MsgType === "link") {
    ctx.body = [
      {
        title: message.Title,
        description: message.Description,
        picUrl:
          "http://mmbiz.qpic.cn/mmbiz_jpg/XZSjEA3Ws5GWu5YMnrHeMdQia7eaxuoJB3SKAY3tzcytzLhRfF5ibJgHNNdMIPCSGt3YGLNTVrq1rSI5h33jeJ2A/0",
        url: message.Url,
      },
    ];
  }
};
