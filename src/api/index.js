import ajax from 'axios'
const baseUrl = '/cgi-bin/musicu.fcg'
export const reqRecommend = () => {
  const url =params(reqRecommendObj)
  console.log(url,baseUrl)
  return ajax.get('/api/getRecomend', {
    params:data
  })
}
export const reqSingers = () => ajax.get('/reqSingerList')
//api拼接
function params(data) {
  let url = ''
  for (const key in data) {
    let value = ''
    if (data[key] instanceof Object) {
      value = JSON.stringify(data[key])
      let t= value.replace(/"/g, "%22")
      url += `&${key}=${t}`
    } else {
      value = data[key] !== undefined?data[key]:''
      url += `&${key}=${encodeURIComponent(value)}`
    }
  }
  return changeStr(url,1,'?')
}
//str:原始字符串，index,开始位置,changeStr，改变后的字
// function changeStr(str,index,changeStr){
//   return str.substr(0, index) + changeStr+ str.substr(index + changeStr.length);
// }
function changeStr(str,index,changeStr){
  return changeStr+ str.substr(index, str.length);
}
var reqRecommendObj = {
  cgiKey: 'GetHomePage',
  _: 1585706025772,
  data: {"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}
}

var data = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq',
  hostUin: 0,
  sin: 0,
  ein: 29,
  sortId: 5,
  needNewCode: 0,
  categoryId: 10000000,
  rnd: Math.random(),
  format: 'json'
}


