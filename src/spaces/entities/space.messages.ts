import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from "sequelize";
import { sequelize } from "../../core"
import { SpacePants } from "./space.pants";

export class SpaceMessages extends Model<InferAttributes<SpaceMessages>, InferCreationAttributes<SpaceMessages>> {
    declare space_message_id: CreationOptional<string>;
    declare message: string;
    declare sender: ForeignKey<string>
    declare sentAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>; 
}

SpaceMessages.init(
    {
        space_message_id: {
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
            type: DataTypes.UUIDV1,
            allowNull: false,
            references: {
                model: SpacePants,
                key: 'participant_id',
            }
        }
    }, 
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
    }
);