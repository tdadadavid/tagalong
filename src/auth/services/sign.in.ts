import { Op } from "sequelize";
import { ControllerArgs,computeExpiryDate, UnAuthorizedError, generateToken,config } from "../../core";
import { User } from "../../entities/user";
import { compare } from "bcrypt";

export class Login {

    constructor(private readonly userModel: typeof User){}


    login = async ({ input }: ControllerArgs) => {
        const { email, password } = input;
        
        const user = await this.userModel.scope("withPassword").findOne({ where: Login.getFilter(email) });
        if(!user) throw new UnAuthorizedError(`Invalid credentials`);

        const passwordIsSame = await compare(password, user.password!);
        if(!passwordIsSame) throw new UnAuthorizedError(`Invalid credentials`)

        const accessToken: string = generateToken(
            { id: user.id, email: user.email },
            config.accessTokenSecret,
            parseInt(config.accessTokenExpiresIn)
        );
        const accessTokenExpiry: Date = computeExpiryDate(parseInt(config.accessTokenExpiresIn));


        const refreshToken: string = generateToken(
            { id: user.id, email: user.email },
            config.refreshTokenSecret,
            parseInt(config.refreshTokenExpiresIn)
        );

        const refreshTokenExpiry: Date = computeExpiryDate(parseInt(config.refreshTokenExpiresIn));

        return  {
            message: "Login successful",
            data: {
                user,
                tokens: {
                    accessToken,
                    accessTokenExpiry,
                    refreshToken,
                    refreshTokenExpiry
                }
            }
        }
    }


    private static getFilter = (email: string) => {
        return {
            [Op.or]: [
                { email },
                { phoneNumber: email }
            ]
        }
    }

}