// import { createApp } from 'vue' 换成自己定义的渲染器，并引入
import { createApp } from './runtime-canvas'
import { getRootContainer } from "./game";
import App from './App.vue'

// createApp(App).mount('#app')
createApp(App).mount(getRootContainer())

