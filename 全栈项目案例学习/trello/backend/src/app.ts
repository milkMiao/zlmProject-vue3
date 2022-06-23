import configs from './config/index'
import Koa, {Context, Next} from 'koa' //红色杠？因为koa是js写的，需要安装ts解析声明 -- npm i -D @types/koa
import KoaRouter from 'koa-router' //注册路由
import { bootstrapControllers } from 'koa-ts-controllers' //选择了一个基于 `TypeScript` 的路由控制框架：`koa-ts-controllers`
import Boom from '@hapi/Boom';

const app = new Koa();
const router = new KoaRouter(); //注册路由

(async ()=>{
    await bootstrapControllers(app, {
        router: router,  //使用的路由库
        basePath: '/api',//设置访问接口路径的前缀，`/api`。
        versions: [1],   //接口版本，会附加到 `basePath` 之后，`/api/v1`。
        controllers: [   //控制器类文件的存放目录
            __dirname + 'controllers/**/*'
        ],
        errorHandler: async (err: any, ctx: Context) => {
            console.log(err);

            let status = 500;
            let body: any = {
                statusCode: status,
                error: "Internal Server error",
                message: "An internal server error occurred"
            }

            if (err.output) {
                status = err.output.statusCode;
                body = {...err.output.payload};
                if (err.data) {
                    body.errorDetails = err.data;
                }
            }

            ctx.status = status;
            ctx.body = body;
        }
    });

    //对未命中的路由（不存在的api）进行一个单独的处理。
    // 以上需要注意：
    // 1、- `await`
    // 2、- `router.all` 放在 `bootstrapControllers` 后面否则每次请求都会先处理 `'*'`。
    router.all('*', async ctx => {
        throw Boom.notFound();
    });

    app.use( router.routes() ); // 注册路由到koa中间件

    app.listen( configs.server.host , configs.server.port, ()=>{
        console.log(`服务器启动成功：http://${configs.server.host}:${configs.server.port}`)
    })
})()



