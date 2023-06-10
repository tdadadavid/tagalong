import { Op } from "sequelize";
import { ConflictError, ControllerArgs, UnAuthorizedError } from "../../core";
import { User } from "../../users/entities/user";
import { Conversations, Messages } from "../entities";

type UserSpaceOptions = {
    userId: string;
    spaceId: string;
}


export class AddParticipantsToSpace {
    constructor(
        public readonly spaceModel: typeof Conversations,
        public readonly userModel: typeof User,
    ){}

    add = async ({input, user}: ControllerArgs) => { }
}