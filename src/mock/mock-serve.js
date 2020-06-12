import Mock from 'mockjs'
import recommend from './recommend.json'
import singerList from './singer.json'
import singerDetail from './singerDetail.json'

Mock.mock('/reqRecomend',recommend)
Mock.mock('/reqSingerList', singerList)
Mock.mock('/reqSingerDetail?id=003Nz2So3XXYek', singerDetail)
