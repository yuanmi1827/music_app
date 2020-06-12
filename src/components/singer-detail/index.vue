<template>
    <music-list :bgImage="singer.avatar" :songs="songs"></music-list>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import MusicList from 'components/music-list' 
  import {reqSingerDetail} from 'api'
  import {createSong} from 'common/js/song.js'
  export default {
    name: 'SingerDetail',
    
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: [],
        show: false
      }
    },
    created() {
      this.getSingerDetail()
    },
    mounted() {
    },
    methods: {
      async getSingerDetail() {
        if(!this.singer.id) {
          this.$router.push('/singer')
          return 
        }
        let result = await reqSingerDetail(this.singer.id)
        this.songs = this._normalizeSongs(result.data.data.list)
        console.log(this.songs, 'ppppppppppppp')
      },
      _normalizeSongs(list) {
        let res = []
        list.forEach(item => {
          let {musicData} = item
          res.push[createSong(musicData)]
        });
        console.log(res, '-------------')
        return res
      }
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