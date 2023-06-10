import { Op } from "sequelize";
import { Socket } from "socket.io";


import { ConflictError, ControllerArgs, hashData } from "../../core";
import { User } from "../../users/entities";

export class RegisterUser {

    constructor(private readonly model: typeof User) {}

    register = async ({ input }: ControllerArgs) => {
        const {name, email, phoneNumber, password } = input;

        const filter = {
            [Op.or]:[
                { email },
                { phoneNumber }
            ]
        }

        const existingUser = await this.model.findOne({ where: filter })
        if(existingUser) throw new ConflictError("User with email/phoneNumber already exists");

        const user = await this.model.create({
            name,
            email,
            phoneNumber,
            password: await hashData(password)
        });

        const data = user?.toJSON()
        delete data.password


        return  {
            message: "Registration successful",
            data
        }
    }

}