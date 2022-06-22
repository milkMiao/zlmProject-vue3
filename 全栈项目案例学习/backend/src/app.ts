import configs from './config/index'
import Koa from 'koa' //红色杠？因为koa是js写的，需要安装ts解析声明 -- npm i -D @types/koa

const app = new Koa()
app.listen( configs.server.host , configs.server.port, ()=>{
    console.log(`服务器启动成功：http://${configs.server.host}:${configs.server.port}`)
})
