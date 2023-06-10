import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../core"
import { User } from "../../users/entities/user";

export class Conversations extends Model<
    InferAttributes<Conversations>, InferCreationAttributes<Conversations>>{
    declare conversation_id: CreationOptional<string>;
    declare first_participant: ForeignKey<string>;
    declare second_participant: ForeignKey<string>;
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;
}


Conversations.init(
    {
        conversation_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        first_participant: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        second_participant: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
    }, 
    {
        sequelize,
        modelName: "conversations",
        tableName: "conversations",
        comment: "Users chat.",
        timestamps: true,
    }
)

