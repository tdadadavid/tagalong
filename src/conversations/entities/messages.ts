import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from "sequelize";
import { sequelize } from "../../core"
import { User } from "../../users/entities";
import { now } from "sequelize/types/utils";
import { Conversations } from "./conversations";

export class Messages extends Model<InferAttributes<Messages>, InferCreationAttributes<Messages>> {
    declare conversation_message_id: CreationOptional<string>;
    declare message: string;
    declare sender: ForeignKey<string>
    declare conversation_id: ForeignKey<string>;
    declare sentAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>; 
}

Messages.init(
    {
        conversation_message_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sender: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            }
        },
        conversation_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Conversations,
                key: 'conversation_id'
            }
        },
        sentAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now(),
            allowNull: false,
        }
    }, 
    {
        tableName: "messages",
        sequelize,
        timestamps: true,
        freezeTableName: true,
    }
);