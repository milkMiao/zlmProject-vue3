// 一个控制器类文件  Test.ts
// 这里需要定义一个类，把这个类变成控制类，并绑定其中的类方法到指定的路由中，这就需要用到 ` 装饰器`。
import { Body, Controller,Get, Params, Post , Header} from 'koa-ts-controllers'

@Controller('/test')
class TestController {
    // http://localhost:8080/api/v1/test/hello
    @Get('/hello')  //@Get装饰器
    async sayWorld() {
        return 'Hello Test!';
    }

    //http://localhost:8080/api/v1/test/user/1
    @Get('/user/:id')
    async GetUser(
        @Params() p:{ id: number} //ts写法
    ){
        return '当前用户id是：'+ p.id
    }

    @Post('/user')
    async GetUser2(
        @Body() body:{
            name: string,
            password: string
        },
        @Header() h:any
    ){
        console.log(body)
        console.log('header', h)
        return `当前提交的数据${JSON.stringify(body)}`  // ${body}
        //打印数据就是undefined ？为什么呢？---安装 npm i koa-bodyparser
        // 安装上面插件之后  当前提交的数据[object Object] ？？？
        // 参数处增加  @Header() h:any 即可
    }
}