//列表内-卡片列表
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
import { BoardListCard as BoardListCardModel} from '../models/BoardListCard';//卡片列表
import { Comment as CommentModel} from '../models/Comment';//卡片内评论
import { CardAttachment as CardAttachmentModel} from '../models/CardAttachment';//卡片和附件的中间表-关联关系
import { Attachment as AttachmentModel} from '../models/Attachment';//附件表
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
     * 获取卡片列表（卡片内的附件，评论等信息）
     * 关联表：BoardListCardModel  CardAttachmentModel  AttachmentModel
    */
    @Get('')
    public async getCards(
        @Ctx() ctx: Context,
        @Query() query: GetCardsQuery
    ){
        let {boardListId } = query;

        await getAndValidateBoardList(boardListId, ctx.userInfo.id);
        let boardListCards = await BoardListCardModel.findAll({
            where: { 
                boardListId
            },
            order: [['id', 'asc']],
            include: [
                {
                    model: CommentModel,//评论
                    attributes: ['id']
                },
                {
                    model: CardAttachmentModel,//卡片和附件中间表-关联关系
                    include: [
                        {
                            model: AttachmentModel //附件表
                        }
                    ]
                }
            ]
        });

        let boardListCardsData = boardListCards.map( (card: BoardListCardModel) => {
            // 处理附件的路径和封面
            let coverPath = '';
            let attachments = card.attachments.map( attachment => {
                let data = attachment.toJSON() as CardAttachmentModel & {path: string};
                data.path = configs.storage.prefix + '/' + data.detail.name;

                if (data.isCover) {//附件是封面
                    coverPath = data.path;
                }
                console.log("处理附件&路径", data)
                return data;
            } );
            //数据格式化处理
            return {
                id: card.id,
                userId: card.userId,
                boardListId: card.boardListId,
                name: card.name,
                description: card.description,
                order: card.order,
                createdAt: card.createdAt,
                updatedAt: card.updatedAt,
                attachments: attachments,//附件
                coverPath: coverPath,//封面路径
                commentCount: card.comments.length //评论数
            }
        } );
        return boardListCardsData;
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

