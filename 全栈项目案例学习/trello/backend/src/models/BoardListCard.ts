//面板列表--指定列表内的--卡片信息表
import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    ForeignKey, 
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {BoardList} from "./BoardList";
import {User} from "./User";
import {CardAttachment} from "./CardAttachment";//卡片附件
import {Comment} from "./Comment";

@Table({
    tableName: 'BoardListCard'
})
export class BoardListCard extends Model<BoardListCard> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    userId: number;

    @ForeignKey(() => BoardList)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    boardListId: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(2000),
        allowNull: false,
        defaultValue: ''
    })
    description: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        defaultValue: 0
    })
    order: number;

    @HasMany(() => CardAttachment) //卡片附件
    attachments: CardAttachment[];

    @HasMany(() => Comment)
    comments: Comment[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}