import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'
import './mock/mock-serve'
import router from './router'
import store from './store'
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
