import { Socket } from "socket.io";
import { ControllerArgs, UnAuthorizedError } from "../../core";
import { User } from "../entities";


export class SeeUserInformation {
    constructor(private readonly user: typeof User) {}

    view = async ({input}: ControllerArgs,  emit : Socket['emit']) => {
        const { id } = input;

        const user = await this.user.findByPk(id);
        if(!user) throw new UnAuthorizedError('User not found');

        const result = {
            message: "User chats",
            user
        }

        emit('user:info', JSON.stringify(result));
    }
}