import Mock from 'mockjs'
import recommend from './recommend.json'
import singerList from './singer.json'
import singerDetail from './singerDetail.json'
import searchSinger from './searchSinger.json'
import searchSong from './searchSong.json'
Mock.mock('/reqRecomend',recommend)
Mock.mock('/reqSingerList', singerList)
Mock.mock('/reqSingerDetail?id=003Nz2So3XXYek', singerDetail)
Mock.mock(`/reqSearchSingerOrSong?key=a`, searchSinger)
Mock.mock('/reqSearchSingerOrSong?key=b', searchSong)
