import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/css.css'

Vue.config.productionTip = false
//自定义选择框架插件，未使用默认vue2，vue3框架

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
