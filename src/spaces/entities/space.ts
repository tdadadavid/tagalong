import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../core"
import { User } from "../../users/entities/user";
import { SPACE_VISIBILITY } from "./constants";

export class Spaces extends Model<
    InferAttributes<Spaces>, InferCreationAttributes<Spaces>>{
    declare space_id: CreationOptional<string>;
    declare name: string;
    declare description: string;
    declare spaceOwner: ForeignKey<string>;
    declare visibility: string
    declare image: CreationOptional<string>;
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;
}


Spaces.init(
    {
        space_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        spaceOwner: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        visibility: {
            type: DataTypes.ENUM({
                values: [SPACE_VISIBILITY.PRIVATE, SPACE_VISIBILITY.PUBLIC]
            }),
            defaultValue: SPACE_VISIBILITY.PUBLIC,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,        
        }
    }, 
    {
        sequelize,
        modelName: "spaces",
        comment: "Spaces where users chat",
        timestamps: true,
    }
)

