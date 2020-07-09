import {playMode} from 'common/js/config.js'
const state = {
    //歌手
    singer:{},
    // is playing
    playing: false,
    //is fullScreen
    fullScreen: false,
    //
    playList: [],
    //顺序列表
    sequenceList: [],
    //play mode
    mode: playMode.sequence,
    //当前播放歌曲索引
    currentIndex: -1

}

export default state