// 安装npm i koa  ,import koa报红杠杠---koa是js写的，需要安装类型声明器
// npm i --save-dev @types/koa

// npm i -D ts-node-dev 热重载
// npm i typescript 
import configs from './configs/index';
import Koa,{Context} from 'koa';
import KoaRouter from 'koa-router';
import { bootstrapControllers, Controller } from 'koa-ts-controllers' //koa-ts-controllers 的主要函数，用来初始化应用控制器和路由绑定。
import path from 'path' 
import koaBodyParser from 'koa-bodyparser'
import Boom from '@hapi/boom'
import { Sequelize } from 'sequelize-typescript'; //提供的一个类
import console from 'console';

(async ()=>{
  const app = new Koa();
  const router = new KoaRouter();

  //链接数据库
  const db = new Sequelize({
    ...configs.database,
    models: [__dirname + '/models/**/*']
  })
  
  await bootstrapControllers(app,{
    router: router,
    basePath: '/api',
    versions: [1],
    controllers:[
      __dirname + '/controllers/**/*'
    ],
    errorHandler(err:any,ctx:Context){
      console.log("err", err)
      let status = 500;
      let body:any = {
        "statusCode": 500,
        "error":"Internal Server error",
        "message": "An internal server error occured"
      }
      if(err.output){
        status = err.output.statusCode
        body = {...err.output.payloda}
      }
      ctx.status = status;
      ctx.body = body
    }
  });

  //未命中的路由（不存在的api）进行一个单独的处理
  router.all('*' ,async ctx=>{
    throw Boom.notFound('未注册路由')
  })

  // 注册路由到koa中间件
  app.use( koaBodyParser() );
  app.use( router.routes() );
  app.listen( configs.server.port, configs.server.host, () => {
    console.log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`);
  })
})()
