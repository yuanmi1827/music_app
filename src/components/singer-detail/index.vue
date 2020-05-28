<template>
  <!-- <transition name="slide"> -->
    <music-list></music-list>
  <!-- </transition> -->
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list'
  export default {
    name: 'SingerDetail',
    computed: {
    },
    data() {
      return {
        songs: [],
        show: false
      }
    },
    created() {
     this.myRouter = this.$route.fullPath
     
    },
    mounted() {
    },
    methods: {
      
    },
    watch: {
      myRouter(val,oVal) {
        if(val != oVal) {
          this.show = !this.show
        }
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

   .slide-enter,.slide-enter-active, .slide-leave-active
    transition: all 1s

  .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .slide-enter-to
    transform: translate3d(-100%, 0, 0)
</style>