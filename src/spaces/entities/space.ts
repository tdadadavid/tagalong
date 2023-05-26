import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import { sequelize } from "../../core"

export class Spaces extends Model<
    InferAttributes<Spaces>, InferCreationAttributes<Spaces>>{
    declare space_id: CreationOptional<string>;
    declare name: string;
    declare description: string;
    declare image: string;
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;
}


Spaces.init(
    {
        space_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
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