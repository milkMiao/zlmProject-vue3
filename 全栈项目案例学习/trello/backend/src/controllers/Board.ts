import { Body, Controller,Get, Params, Post ,Put, Delete ,Ctx, Flow} from 'koa-ts-controllers';
import { Context } from 'koa';
import authorization  from '../middlewares/authorization' //权限
import { PostAddBoardBody, PutUpdateBodarBody } from '../validator/Board'
import { Board as BoardModel} from '../models/Board';
import { getAndValidateBoard } from '../validator/Board'
@Controller('/board')
@Flow([authorization]) 
export class BoardController {
    //1、创建面板
    @Post('')
    async addBoard(
        @Ctx() ctx: Context,
        @Body() body: PostAddBoardBody //校验规则
    ){
        let {name} = body
        console.log('body',JSON.stringify(body))

        //验证--数据库中是否已经存在要注册的用户
        let board = new BoardModel();
        board.name = name
        board.userId = ctx.userInfo.id
        await board.save();

        ctx.status = 201;
        return board;
    }

    //2、获取登陆用户所有看板
    // http://localhost:8080/api/v1/board
    @Get('')
    async getBoards(
        @Ctx() ctx: Context
    ) {
        let where = {
            userId: ctx.userInfo.id
        }
        let boards = await BoardModel.findAll({where})
        return boards
    }

    //3、获取当前登陆用户指定的一个看板详情
    @Get('/:id(\\d+)')
    async getBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        // let board = await BoardModel.findByPk(id)
        // if(!board){
        //     throw Boom.notFound('指定看板不存在')
        // }
        // if (board.userId !== ctx.userInfo.id) {
        //     throw Boom.forbidden('禁止访问该面板');
        // }
        // 如上逻辑进行封装--- getAndValidateBoard 函数
        let board = await getAndValidateBoard(id, ctx.userInfo.id)
        return board;
    }

    //4、更新指定看板
    @Put('/:id(\\d+)')
    async updateBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateBodarBody
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id);
        // 更新
        board.name = body.name || board.name;
        await board.save();

        ctx.status = 204;
    }

    //5、删除指定面板
    @Delete('/:id(\\d+)')
    async deleteBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id);
        await board.destroy();

        ctx.status = 204;
    }
}