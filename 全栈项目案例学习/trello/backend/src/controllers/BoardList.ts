import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Params,
    Query,
    Body,
    Flow,
    Ctx,
} from 'koa-ts-controllers'
import authorization from '../middlewares/authorization';
import { Context } from 'koa'
import { BoardList as BoardListModel} from '../models/BoardList';
import { getAndValidateBoard } from '../validator/Board'
import { PostAddListBody, GetListsQuery, PutUpdateListBody, getAndValidateBoardList } from '../validator/BoardList'

@Controller('/list')
@Flow([authorization])
export class BoardListController{
    /*
    * 1、进入面板详情页--创建列表
    */
    @Post('')
    async addList(
        @Ctx() ctx: Context,
        @Body() body: PostAddListBody
    ){
        let { boardId, name} = body

        //数据库中，查询是否已经新增过--当前这条数据  【获取当前面板--是否存在 Board中】
        await getAndValidateBoard(boardId, ctx.userInfo.id);

        let maxOrderBoardList = await BoardListModel.findOne({
            where: {
                boardId
            },
            order: [['order', 'desc']] //排序
        });

        let boardList = new BoardListModel();
        boardList.userId = ctx.userInfo.id;
        boardList.boardId = boardId;
        boardList.name = name;
        boardList.order = maxOrderBoardList ? maxOrderBoardList.order + 65535 : 65535;
        await boardList.save();

        ctx.status = 201;
        return boardList;
    }

    /*
    *  2、获取当前用户--指定面板下的列表集合
    *  /list/1 ==>指的是：获取id为1的列表 【Params方法获取参数】
    *  /list?boardId=1  ===》指的是：面板id为1的列表 【Query方法获取参数】
    */
    @Get('')
    async getLists(
        @Ctx() ctx: Context,
        @Query() query: GetListsQuery
    ){
        let { boardId } = query
        await getAndValidateBoard(boardId, ctx.userInfo.id);//【获取当前面板--是否存在 Board中】
        
        let boardList = await BoardListModel.findOne({
            where : {
                boardId
            },
            order: [['order', 'asc']]
            // order:[ ['id', 'desc'], ['time','asc'] ]  //排序
        })
        return boardList;
    }


    /*
    *  3、获取指定列表详情
    */
    @Get('/:id(\\d+)')
    async getList (
            @Ctx() ctx: Context,
            @Params('id') id: number
    ){
       let boardList = await getAndValidateBoardList(id, ctx.userInfo.id) //BoardList内列表
        return boardList;
    }

   /*
    *  4、更新指定列表
    */
    @Put('/:id(\\d+)')
    async UpdateList(
        @Ctx() ctx: Context,
        @Params('id') id:number,
        @Body() body: PutUpdateListBody
    ){
        let {boardId, name, order} = body
        let boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        boardList.boardId = boardId || boardList.boardId
        boardList.name = name || boardList.name
        boardList.order = order || boardList.order

        await boardList.save();

        ctx.status = 204;
        return;
    }

    /*
    * 5、删除指定列表
    */
    @Delete('/:id(\\d+)')
    async DeleteList(
        @Ctx() ctx: Context,
        @Params('id') id:number,
    ){
        let boardList = await getAndValidateBoardList(id, ctx.userInfo.id);

        boardList.destroy();
        ctx.status = 204;
        return;
    }
}
