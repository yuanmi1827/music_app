<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
  import ListView from 'base/listview'
  import {reqSingers} from 'api'
  import Singer from 'common/js/singer'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    data () {
      return {
        singers: []
      }
    },
    computed:{
      key(){
        return this.$route.path + Math.random()
      }
    },

    mounted() {
      this.getSingers()
    },
    methods: {
      async getSingers() {
        let result = await reqSingers()
        this.singers = this._normalizeSinger(result.data.data.list)
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items:[]
          }
        }
        list.forEach((item,index) => {
          if(index<HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if(!map[key]) {
            map[key] = {
              title: item.Findex,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))

        })
        //有序列表
        let hot = []
        let ret = []
        for (const key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
     
    },
    components: {
      ListView
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
  .v-enter {
    transform: translate3d(100%, 0, 0)
  }
  .v-enter-to {
    transform: translate3d(0%, 0, 0)
  }
  .v-enter-active {
    transition:1s;
  }
  .v-leave{
     transform: translate3d(0%, 0, 0)
  }
  .v-leave-to {
     transform: translate3d(100%, 0, 0)
  }
  .v-leave-active {
    transition:1s;
  }
</style>