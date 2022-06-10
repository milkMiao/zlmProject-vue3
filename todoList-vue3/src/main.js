import { createApp } from 'vue'
import App from './App.vue'
import Store from './store/index'
import element3 from 'element3'

createApp(App).use(Store).use(element3).mount('#app')
