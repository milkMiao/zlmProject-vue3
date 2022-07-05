import { Body, Controller,Get, Params, Post , Header, Query,Ctx} from 'koa-ts-controllers';
import { IsNumberString } from 'class-validator';
import { RegisterBody, LoginBody } from '../validator/User'
import {User as UserModel} from '../models/User';
import Boom from '@hapi/boom'
import { Context } from 'koa';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import configs from '../configs';
@Controller('/user')
export class userController {
    //用户注册
    @Post('/register')
    async register(
        @Ctx() ctx: Context,
        @Body() body: RegisterBody // 注册用户名，密码，重新输入密码(自定义)的校验规则
    ){
        let { name , password} = body
        console.log('body',JSON.stringify(body))

        //验证--数据库中是否已经存在要注册的用户
        let user = await UserModel.findOne({
            where : {name}
        })
        if (user) {
            throw Boom.conflict('注册失败', '用户名已经被注册了');
        }
        let newUser = new UserModel()
        newUser.name = name;
        newUser.password = password;

        await newUser.save();
        return {
            id: newUser.id,
            name: newUser.name,
            createAt: newUser.createdAt
        }
    }

    //用户登陆
    @Post('/login')
    async login(
        @Ctx() ctx: Context,
        @Body() body: LoginBody
    ) {
        let {name, password} = body;

        let user = await UserModel.findOne({
            where: {name}
        });

        if (!user) {
            throw Boom.notFound('登录失败', '用户不存在');
        }

        let md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
        if (password !== user.password) {
            throw Boom.forbidden('登录失败', '密码错误');
        }

        let userInfo = {
            id: user.id,
            name: user.name
        };

        let token = jwt.sign( userInfo, configs.jwt.privateKey );
        ctx.set('authorization', token);

        return userInfo;
    }
}