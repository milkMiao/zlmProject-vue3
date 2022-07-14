import { Body, Controller,Get, Params, Post ,Put, Delete ,Header, Query, Ctx, Flow} from 'koa-ts-controllers';
import { Context } from 'koa';
import { IsNumberString } from 'class-validator';
import { PostAddBoardBody, PutUpdateBodarBody } from '../validator/Board'
import { Board as BoardModel} from '../models/Board';
import authorization  from '../middlewares/authorization' //权限

@Controller('/board')
@Flow([authorization]) 
export class BoardController {
    //1、创建面板
    @Post('')
    async addBoard(
        @Ctx() ctx: Context,
        @Body() body: PostAddBoardBody //校验规则
    ){

    }

    // 2、获取登陆用户所有看板
    @Get('')
    async getBoards(
        @Ctx() ctx: Context
    ) {
        
    }

    //3、获取当前登陆用户指定的一个看板详情
    @Get('/:id(\\d+)')
    async getBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        
    }

    //4、更新指定看板
    @Put('/:id(\\d+)')
    async updateBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateBodarBody
    ){

    }

    //5、删除指定面板
    @Delete('/:id(\\d+)')
    async deleteBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ){
        
    }

}
