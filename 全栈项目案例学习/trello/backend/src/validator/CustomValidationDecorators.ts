//重新输入密码--校验规则
import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments
} from 'class-validator';

export function IsSameValue(property: string, validationOptions?: ValidationOptions) {

    return function(
        target: Object,
        propertyName: string
    ) {

        registerDecorator({ //注册装饰器
            name: 'isSameValue',
            target: target.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {

                    // 第一个参数指定的属性对应的值
                    const relatedValue = validationArguments && (validationArguments.object as any)[property]

                    // value：是当前装饰器属性对应的值
                    return relatedValue === value;

                }
            }
        });

    }
}