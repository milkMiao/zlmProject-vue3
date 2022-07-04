// 一个控制器类文件  Test.ts
// 这里需要定义一个类，把这个类变成控制类，并绑定其中的类方法到指定的路由中，这就需要用到 ` 装饰器`。
import { Body, Controller,Get, Params, Post , Header, Query} from 'koa-ts-controllers';
import { IsNumberString } from 'class-validator';
import Boom from '@hapi/Boom';

class getUserQuery{
    @IsNumberString()
    page: number;
}

@Controller('/test')
class TestController {
    // http://localhost:8080/api/v1/test/hello
    @Get('/hello')  //@Get装饰器
    async sayWorld(a:any) {
        console.log(a.b) //a里不存在b，那么在录音拦截里面做错误统一处理！！！
        return 'Hello Test!';
    }

    //http://localhost:8080/api/v1/test/user/1
    // Params的数字的验证，输入字符串或者其他，报错显示
    @Get('/user/:id(\\d+)')
    async GetUser(
        // @Params() p:{ id: number} //ts写法
        @Params('id') id:number      //两种写法
    ){
        return 'Params 当前用户id是：'+ id //p.id
    }

    //http://localhost:8080/api/v1/test/user?id=1
    @Get('/user')
    async GetUser3(
        @Query() p:{id:number}
    ){
        return 'user?id=123 当前用户id是：'+ p.id
    }

    //用户列表请求，query，body请求参数验证处理，引入 class-validator组件
    // http://localhost:8080/api/v1/test/users?page=1 通过的连接
    @Get('/users')
    async GetUser4(
        @Query() p: getUserQuery
    ){
        console.log(JSON.stringify(p))
        // if(true){
        //     throw Boom.notFound('注册失败','用户不存在')
        // }
        return 'getUserQuery当前用户id是：'+ JSON.stringify(p)
    }

    @Post('/user') //浏览器提交请求比较麻烦，使用postman软件
    async PostUser(
        @Body() body:{
            name:string,
            password: string
        }
    ){
        return `当前提交的数据是：${JSON.stringify(body)}`
    }

    // @Post('/user')
    // async GetUser2(
    //     @Body() body:{
    //         name: string,
    //         password: string
    //     },
    //     @Header() h:any
    // ){
    //     console.log(body)
    //     console.log('header', h)
    //     return `当前提交的数据${JSON.stringify(body)}`  // ${body}
    //     //打印数据就是undefined ？为什么呢？---安装 npm i koa-bodyparser
    //     // 安装上面插件之后  当前提交的数据[object Object] ？？？
    //     // 参数处增加  @Header() h:any 即可
    // }
}