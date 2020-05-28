<template>
  <scroll class="listview" 
          :listenScroll="listenScroll"
          ref="listView"
          @scroll="scroll"
          :probeType="probeType"
          :data="data">
    <ul>
      <li v-for="(group,index1) in data" :key="index1" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li v-for="(item,index) in group.items" :key="index"  @click="selectItem(item)" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item" :class="{'current':currentIndex === index}" >{{item}}</li>
      </ul>
    </div>
    <!-- 滚动固定标题 -->
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
  </scroll> 
</template>

<script type='text/ecmascript-6'>
import scroll from '../scroll'
import {getData} from '../../common/js/dom'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
  export default {
    props: {
      data: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    data () {
      return {
        scrollY: -1,//实时滚动位置
        currentIndex: 0,
        diff: -1, //差值
      }
    },
    created() {
      this.listenScroll = true
      this.touch = {}
      this.probeType = 3
    },
    computed: {
      shortcutList() {
        return this.data.map(group => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if(this.scrollY >0) {
          return ''
        }
        return this.data[this.currentIndex]?this.data[this.currentIndex].title: ''
      }
    },
    methods: {
      onShortCutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex*1
        this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
      },
      onShortCutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = Math.floor((this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT )
        let anchorIndex = this.touch.anchorIndex + delta
        this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
      },
      scroll(pos) {
        this.scrollY = pos.y
        //判断scrollY落在哪个位置，首先计算每个group高度
      },
      selectItem(item) {
        this.$emit('select', item)
      },
      //计算每个group高度
      _calculataHeight() {
        this.listHeight = []
        let list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for(let i=0;i<list.length; i++) {
          height += list[i].clientHeight
          this.listHeight.push(height)
        }
      }

    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculataHeight()
        },20)
      },
      scrollY(newY) {
        if(newY>0) {
          this.currentIndex = 0
          return
        }
        //在中间部分滚动
        for(let i=0;i<this.listHeight.length-1;i++) {
          const height1 = this.listHeight[i]
          const height2 = this.listHeight[i+1]
          if(-newY>=height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2+newY
            return
          }
        }
        //当滚动到底部 -newY > 最后一个元素的上线
        if(-newY > this.listHeight[this.listHeight.length-1]) {
          this.currentIndex = this.listHeight.length-2
        }
        this.currentIndex = 0
      },
      diff(newVal) {
        let  fixedTop =(newVal>0 && newVal<TITLE_HEIGHT)? newVal-TITLE_HEIGHT:0
        if(this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>