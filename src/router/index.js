import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank'
import Recommend from 'components/recommend'
import Singer from 'components/singer'
import Search from 'components/search'
import SingerDetail from 'components/singer-detail'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/recommend',
      component:Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'SingerDetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/',
      redirect: Recommend
    }
  ]
})