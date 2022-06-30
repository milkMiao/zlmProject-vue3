// 创建 `backend/src/models` 目录：
// 用来存放模型文件，我们下面以用户表为例，来创建 `User.ts` 模型文件。

//我们使用 `sequelize-typescript` 来定义模型。
// 通过各种【装饰器】来定义模型类特性。
import {
    Model, 
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    AllowNull,
    Unique,
    DataType,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript'
import crypto from 'crypto' //加密js库

@Table({ //定义当前模型对应的表信息
    tableName: 'User',
})

export class User extends Model<User> { // 所有的模型类都需要继承自 `Model` 类。同时传入当前模型类作为其范型参数。
    @PrimaryKey //设置为主键
    @AutoIncrement //设置为自动增长
    @Column //定义字段信息（注意：该装饰器一定要出现在其他装饰器的后面，即装饰器列表的最后一个
    id: number;

    @AllowNull(false) //不允许为 `null` 值
    @Unique(true)     //设置是否值唯一
    @Column({
        type: DataType.STRING(50)
    })
    name: string;

    @Column
    set password(val: string) {
        let md5 = crypto.createHash('md5');
        let newPassword = md5.update(val).digest('hex');
        this.setDataValue('password', newPassword);
    }

    //当 `timestamps` 配置为 `true` 的时候，
    // 我们每次添加、更新、（软）删除记录的时候，会自动更新表中对应的上面三个字段的值（时间）。
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}