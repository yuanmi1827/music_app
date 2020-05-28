const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
var express = require('express')
var axios =require('axios')
const apiRoutes = express.Router()
var app = express()
apiRoutes.get('/getRecomend',(req,res) => {
  console.log(req,'-------------------------')
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.use('/api', apiRoutes)
module.exports={
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  lintOnSave: true,
  productionSourceMap: true,
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('components',resolve('./src/components'))
    .set('common',resolve('./src/common'))
    .set('api',resolve('./src/api'))
    .set('base',resolve('./src/base'))

      //set第一个参数：设置的别名，第二个参数：设置的路径
  }
}


