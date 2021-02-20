import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'

Vue.prototype.axios = axios //其他组件可通过this.axios引用

//全局注册 滑动组件
import Scroller from '@/components/Scroller' 
Vue.component('Scroller',Scroller)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
