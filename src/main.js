// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from '../store/store'
import Mint from 'mint-ui'
import './assets/css/reset.css'
import  'mint-ui/lib/style.css'
import './assets/iconfont/iconfont.css'
import animate from 'animate.css'
import fastClick from 'fastclick'
Vue.config.productionTip = false

fastClick.attach(document.body)
Vue.use(Mint,Vuex,animate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Mint,
  components: { App },
  template: '<App/>'
})
