/*
 * @Descripttion: 
 * @Author: zhangzhichao
 * @Date: 2020-05-09 01:22:18
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-13 14:02:39
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeroSchema = new Schema({
  name: String,
  img: String,
  heroId: String,
  alias: [
    String
  ],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

HeroSchema.pre('save', function (next) {
  if(this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }

  next();
})

const Hero = mongoose.model('Hero', HeroSchema);
