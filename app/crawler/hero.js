/*
 * @Descripttion: 
 * @Author: zhangzhichao
 * @Date: 2020-05-10 08:50:20
 * @LastEditors: zhangzhichao
 * @LastEditTime: 2020-05-13 16:06:11
 */
const cheerio = require('cheerio');
const rp = require('request-promise');
const { writeFileSync } = require('fs');
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
const heros = [];
const getImdbCharacters = async page => {
  const uri = `https://www.newyx.net/gl/lolbjgs/index_${page}.htm`;
  const body = await rp(uri);

  const $ = cheerio.load(body);

  console.log(`正在爬去第${page}页`);
  $('div.piclan_l dl').each(function() {
    const name = $(this).find('dd h2 a').text()
    .replace(/《LOL》/, "")
    .replace(/背景故事/, "")
    .replace(/的/, "")
    const img = $(this).find('dt a img').attr('src')
    const story = $(this).find('dt a').attr('href')
    heros.push({
      name,
      img,
      story
    })
  })

  if($('div.piclan_l dl').length < 10) {
    console.log('爬完了');
    writeFileSync('./heros.json', JSON.stringify(heros, null, 2), 'utf-8')
  } else {
    await sleep(500);
    page++
    getImdbCharacters(page)
    console.log(`现在有${heros.length}条数据`)
  }

  console.log(heros.length)
}

const fetchHeroStory = async uri => {
  const body = await rp(uri);

  const $ = cheerio.load(body);

  const data = $('div.news_contet p').text().split('人物关系')[0].split('皮肤展览')[0].split('\n\t背景故事')[1]
  return data
}

const getHreoProfile = async () => {
  const heros = require('./heroAlice.json')
  
  for(let i = 0;i < heros.length;i++) {
    if(heros[i].story) {
      const data = await fetchHeroStory(heros[i].story);
      heros[i].storyData = data;
    }
  }

  writeFileSync('./herosStory.json', JSON.stringify(heros, null, 2), 'utf-8')
}
// getImdbCharacters(1)
// getHreoProfile()
