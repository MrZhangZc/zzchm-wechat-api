/*
 * @Descripttion: 回复策略
 * @Author: zhangzhichao
 * @Date: 2020-05-09 10:30:01
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-09 10:33:25
 */


 const tip = '欢迎来到zzchm\n' + '点击<a href="http:\\blog.lihailezzc.com">zzchm</a>'
 module.exports = async (ctx, next) => {
   const message = ctx.weixin;

   console.log({message});

   ctx.body = tip;
 }
