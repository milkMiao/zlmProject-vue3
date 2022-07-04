import { Body, Controller,Get, Params, Post , Header, Query} from 'koa-ts-controllers';
import { Json } from 'sequelize/types/lib/utils';
// import { IsNumberString } from 'class-validator';
import { RegisterBody } from '../validator/User'

@Controller('/user')
export class userController {
    //用户注册
    @Post('/register')
    async register(
        @Body() body: RegisterBody // 注册用户名，密码，重新输入密码(自定义)的校验规则
    ){
        let { name , password} = body
        console.log('body',JSON.stringify(body))

        //数据库中是否已经存在要注册的用户
        
    }
}