import { //装饰器
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
    AllowNull,
    Unique,
    DataType,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import crypto from "crypto";//加密js库

@Table({
    tableName: 'User',
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;


    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(50)
    })
    name: string;


    @AllowNull(false)
    @Column({
        type: DataType.STRING(32),
        field: 'password'
    })
    _password: string;

    @Column
    set password(val: string) {
        let md5 = crypto.createHash('md5');
        let newPassword = md5.update(val).digest('hex');
        this.setDataValue('password', newPassword);
    }


    // 当 `timestamps` 配置为 `true` 的时候，
    // 我们每次添加、更新、（软）删除记录的时候，
    //  会自动更新表中对应的上面三个字段的值（时间）。
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}
