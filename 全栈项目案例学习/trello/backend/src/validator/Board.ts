import {
    Length,
    IsNotEmpty,
    MaxLength,
    ValidateIf
} from 'class-validator';
import {Board as BoardModel} from "../models/Board";
import Boom from "@hapi/boom";

class BoardBody {
    @Length(1, 50, {
        message: '用户名不能为空或者大于50个字符'
    })
    name: string;

    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;
}
//创建面板
export class PostAddBoardBody { //export class PostAddBoardBody extends BoardBody{
    @IsNotEmpty({
        message: '面板名称不能为空'
    })
    @MaxLength(255,{
        message: '面板名称不能超过255个字符'
    })
    name: string;
}
//更新指定看板
export class PutUpdateBodarBody {
    @ValidateIf( o => o.name !== undefined)
    @MaxLength(255,{
        message: '面板名称不能超过255个字符'
    })
    name: string;
}

export async function getAndValidateBoard(id: number, userId: number): Promise<BoardModel> {
    let board = await BoardModel.findByPk(id);

    if (!board) {
        throw Boom.notFound('指定看板不存在');
    }

    if (board.userId !== userId) {
        throw Boom.forbidden('禁止访问该面板');
    }

    return board;
}