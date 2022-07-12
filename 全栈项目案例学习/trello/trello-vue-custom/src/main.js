import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/css.css' // @等价于 /src 这个目录
import message from '@/components/TMessage/TMessage'

Vue.config.productionTip = false
//自定义选择框架插件，未使用默认vue2，vue3框架

Vue.prototype.$message = message;//消息提示组件放在vue原型里,使用 this.$message 即可
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
