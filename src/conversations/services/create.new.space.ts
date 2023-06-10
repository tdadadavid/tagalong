import { ConflictError, ControllerArgs } from "../../core";
import { User } from "../../users/entities/user";
import { Conversations } from "../entities";


export class CreateNewSpace {
    //TODO: implement logging.
    // private readonly logger = new Logger(CreateNewSpace.name);
    constructor(
        public readonly spaceModel: typeof Conversations,
        public readonly userModel: typeof User
    ){}

    create = async ({input, user }: ControllerArgs) => {}
}