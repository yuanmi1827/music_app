<template>
  <div>tuijian</div>
</template>

<script type='text/ecmascript-6'>
  import {reqRecommend}from 'api'
  export default {
    data () {
      return {
      }
    },
    mounted() {
      this.getRecommendData()
    },
    methods: {
      async getRecommendData() {
        let result = await reqRecommend()
        console.log(result)
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>