import { 
    Ctx,
    Body, 
    Controller, 
    Post 
} from 'koa-ts-controllers';
import { RegisterBody } from '../validators/User'; //校验规则
import { Context } from 'koa';
import Boom from '@hapi/boom'
import { User as UserModel } from '../models/User';

@Controller('/user')
export class UserController {
    @Post('/register')
    async register(
        // @Body() query: RegisterBody
        @Ctx() ctx: Context,
        @Body() body: RegisterBody
    ) {
        //注册逻辑
        let {name, password} = body;

        let where = {name};
        let user = await UserModel.findOne({where});
        if (user) {
            throw Boom.conflict('用户名已经被注册了');
        }

        let newUser = new UserModel();
        newUser.name = name;
        newUser.password = password;
        await newUser.save();

        ctx.status = 201;
        return {
            id: newUser.id,
            name,
            createAt: newUser.createdAt
        };
    }
}