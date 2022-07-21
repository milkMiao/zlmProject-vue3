//列表内-卡片
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
import { BoardListCard as BoardListCardModel} from '../models/BoardListCard';
import { Comment as CommentModel} from '../models/Comment';
import { CardAttachment as CardAttachmentModel} from '../models/CardAttachment';//卡片附件
import { Attachment as AttachmentModel} from '../models/Attachment';
import { 
    PostAddCardBody, GetCardsQuery, PutUpdateCardBody, 
    getAndValidateBoardListCard, getAndValidateCardAttachment
 } from '../validator/BoardListCard';
import {getAndValidateBoardList} from '../validator/BoardList';
import configs from '../configs';
import Boom from '@hapi/boom';

@Controller('/card')
@Flow([authorization])
export class BoardListCardController{
    /**
     * 添加卡片
    */
    @Post('')
    public async addCard(
        @Ctx() ctx: Context,
        @Body() body: PostAddCardBody
    ) {
        let {boardListId, name, description} = body;

        await getAndValidateBoardList(boardListId, ctx.userInfo.id);

        let boarListCard = new BoardListCardModel();
        boarListCard.userId = ctx.userInfo.id;
        boarListCard.boardListId = boardListId;
        boarListCard.name = name;
        boarListCard.description = boarListCard.description || '';

        await boarListCard.save();

        ctx.status = 201;
        return boarListCard;
    }

    /**
     * 获取卡片列表
    */
    @Get('')
    public async getCards(
        @Ctx() ctx: Context,
        @Query() query: GetCardsQuery
    ){
        let {boardListId } = query;

        await getAndValidateBoardList(boardListId, ctx.userInfo.id);
        let boardListCards = await BoardListCardModel.findAll({
            where: { boardListId },
            order: [['id', 'asc']],
        });
        return boardListCards;
    }

    /**
     * 获取一个卡片信息
    */
    @Get('/:id(\\d+)')
    public async getCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ){
        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);

        return boardListCard;
    }

    /**
     * 更新一个卡片信息
    */
    @Put('/:id(\\d+)')
    public async putCard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateCardBody
    ) {
        let {boardListId, name, description, order} = body;

        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);

        boardListCard.boardListId = boardListId || boardListCard.boardListId;
        boardListCard.name = name || boardListCard.name;
        boardListCard.description = description || boardListCard.description;
        boardListCard.order = order || boardListCard.order;

        await boardListCard.save();

        ctx.status = 204;
        return;
    }

    /**
     * 删除一个卡片信息
    */
    @Delete('/:id(\\d+)')
    public async deleteCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ){
        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);

        await boardListCard.destroy();
        ctx.status = 204;
        return;
    }
}

