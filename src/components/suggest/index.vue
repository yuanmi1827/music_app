<template>
  <scroll ref="suggest"
          class="suggest"
  >
    <ul class="suggest-list">
      <li class="suggest-item">
        <div class="icon">
          <i></i>
        </div>
        <div class="name">
          <p class="text"></p>
        </div>
      </li>
      <!-- <loading v-show="hasMore" title=""></loading> -->
    </ul>
    <!-- <div class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div> -->
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll'
  import {reqSearchSingerOrSong} from 'api'
  import {createSong} from 'common/js/song.js'
  const TYPE_SINGER = 'singer'
  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        result: [] // 搜索结果列表
      }
    },
    methods: {
      async getSearchData(value) {
        let result = await reqSearchSingerOrSong(value)
        console.log(result)
      },
      _getResult(data) {
        let ret = []
        if(data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if(data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach(musicData => {
          if(musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
      }
    },
    watch: {
      query(newQuery) {
        this.getSearchData(newQuery)
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>