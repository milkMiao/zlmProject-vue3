//自定义校验规
import { isNotEmpty, Length, ValidateIf } from 'class-validator'
import { isSameValue } from './CustomValidationDecorators' //自定义校验规则--两次密码是否一致
export class RegisterBody {
    @Length(1,50,{message:'用户名不能为空或者大雨50个字符长度'})
    name: string;

    @isNotEmpty({message: '文章标签不可以为空'}) //不能是空的，也就是不能是'',undefined,null
    password: string;

    @ValidateIf(o => o.password)
    @isSameValue('password', {message: '两次输入的密码不一致'})
    rePassword: string;
}