<template>
  <div id="app">
    <m-header/>
    <tab/>
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import MHeader from "components/m-header"
import Tab from 'components/tab'
import Player from 'components/player'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style>

</style>
