<template>
  <div class="music-list">
    <div class="back" >
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list @select="selectSong" :songs="songs" :rank="rank"></song-list>
      </div>
      <!-- <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div> -->
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex'
  import Scroll from 'base/scroll'
  import SongList from 'base/songList/song-list.vue'
  import {prefixStyle} from 'common/js/dom.js'
  const RERSERVE_HEIGHT = 44
  const transform = prefixStyle('transform')
  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: function() {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0,
        minScrollY: 0,//layer最小滚动距离
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      const imageHeight = this.$refs.bgImage.clientHeight
      this.$refs.list.$el.style.top = imageHeight+'px'
      this.minScrollY = -imageHeight + RERSERVE_HEIGHT
    },
    methods: {
      selectSong(song, index) {
        this.selectPlay({
          list: this.songs,
          index
        })

      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      scrollY(newY) {
        let translateY = Math.max(this.minScrollY, newY)
        let zIndex = 0 // 设置背景图zIndex
        //下拉图片跟随放大
        let scale = 1
        const percent = Math.abs(newY/this.minScrollY)
        if (newY > 0) {
          zIndex = 10
          scale = scale + percent
        }
        this.$refs.layer.style[transform]= `translate3d(0, ${translateY}px, 0)`
        if (newY < this.minScrollY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RERSERVE_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''

        }
        //
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    components: {
      Scroll,
      SongList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>