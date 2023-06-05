import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from "sequelize";
import { sequelize } from "../../core"
import { Spaces } from "./space";

export class SpacePants extends Model<InferAttributes<SpacePants>, InferCreationAttributes<SpacePants>> {
    declare space_pants_id: CreationOptional<string>;
    declare space_id: ForeignKey<string>;
    declare participant_id: ForeignKey<string>;
    declare joinedDate?: CreationOptional<Date>;
    declare leftDate?: CreationOptional<Date>;
}

SpacePants.init(
    {
        space_pants_id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true,
            primaryKey: true,
            unique: true,
        },
        space_id: {
            type: DataTypes.UUID,
            references: {
                model: Spaces,
                key: 'space_id'
            },
            allowNull: false,
        },
        participant_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
        },
        joinedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
        leftDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfter: 'joined_date'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
    }
)




