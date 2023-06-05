import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';
import { sequelize } from '../../core/config';

export class User extends Model<
    InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<string>;
    declare name: string;
    declare email: string;
    declare phoneNumber: string;
    declare password?: CreationOptional<string | null>
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        defaultScope: {
            attributes: {
                exclude: [
                    'password',
                    'verifyToken',
                    'verifyTokenExpiresIn',
                    'resetToken',
                    'resetTokenExpiresIn'
                ]
            }
        },
        scopes: {
            withPassword: {
                attributes: {
                    exclude: [
                        'verifyToken',
                        'verifyTokenExpiresIn',
                        'resetToken',
                        'resetTokenExpiresIn'
                    ]
                }
            },
            withTokens: {
                attributes: {
                    exclude: [
                        'password'
                    ]
                }
            }
        },
        modelName: 'user',
        sequelize,
        timestamps: true,
    },
);