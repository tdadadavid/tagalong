import { Op } from "sequelize";
import { ControllerArgs,computeExpiryDate, UnAuthorizedError, generateToken,config } from "../../core";
import { User } from "../../users/entities";
import { compare } from "bcrypt";

export class Login {

    constructor(private readonly userModel: typeof User){}


    login = async ({ input }: ControllerArgs) => {
        const { email, password } = input;

        // 
        const filter: Record<(string|number|symbol), Array<Record<string, string>>> = {
            [Op.or]: [
                { email },
                { phoneNumber: email }
            ]
        }
        
        const user = await this.userModel.scope("withPassword").findOne({ where: filter });
        if(!user) throw new UnAuthorizedError(`Invalid credentials`);

        const passwordIsSame = await compare(password, user.password!);
        if(!passwordIsSame) throw new UnAuthorizedError(`Invalid credentials`)

        const accessToken: string = generateToken(
            { id: user.id, email: user.email },
            config.accessTokenSecret,
            config.accessTokenExpiresIn
        );
        const accessTokenExpiry: Date = computeExpiryDate(parseInt(config.accessTokenExpiresIn));


        const refreshToken: string = generateToken(
            { id: user.id, email: user.email },
            config.refreshTokenSecret,
            config.refreshTokenExpiresIn
        );

        const refreshTokenExpiry: Date = computeExpiryDate(parseInt(config.refreshTokenExpiresIn));
        const {dataValues} = user;

        delete dataValues.password;
        return  {
            message: "Login successful",
            data: {
                user: dataValues,
                tokens: {
                    accessToken,
                    accessTokenExpiry,
                    refreshToken,
                    refreshTokenExpiry
                }
            }
        }
    }
}