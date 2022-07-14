import {
    Length,
    IsNotEmpty,
    MaxLength,
    ValidateIf
} from 'class-validator';

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