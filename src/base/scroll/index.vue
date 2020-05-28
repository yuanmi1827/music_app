<template>
  <div ref="wraper">
    <slot></slot>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
  export default {
    name: 'SCroll',
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type:Array,
        default: null
      }, 
      listenScroll: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {

      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if(!this.$refs.wraper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wraper, {
          probeType:this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll',
           (pos) => {
            // me.$emit('scroll', pos)
            me.$emit('scroll', pos)
          })
        }
      },
     
      //启用bscroll
      enable() {
        this.scroll && this.scroll.enable()
      },
      //禁用bscroll
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //滚动到相应位置
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      //
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh
        }, 20)
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>