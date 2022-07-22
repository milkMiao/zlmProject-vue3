// 卡片和附件的--中间表--关联关系
import {
    AutoIncrement, BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {User} from "./User";
import {BoardListCard} from "./BoardListCard";
import {Attachment} from "./Attachment";

@Table({
    tableName: 'CardAttachment'
})
export class CardAttachment extends Model<CardAttachment> {

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

    @ForeignKey(() => BoardListCard)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    boardListCardId: number;

    @ForeignKey(() => Attachment)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    attachmentId: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    })
    isCover: boolean;

    @BelongsTo(() => Attachment) //附件信息详情--{}
    detail: Attachment;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}