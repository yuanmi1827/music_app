import Mock from 'mockjs'
import recommend from './recommend.json'
import singerList from './singer.json'


Mock.mock('/reqRecomend',recommend)
Mock.mock('/reqSingerList', singerList)
