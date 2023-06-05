import { ConflictError, ControllerArgs } from "../../core";
import { User } from "../../users/entities/user";
import { Spaces } from "../entities";


export class CreateNewSpace {
    //TODO: implement logging.
    // private readonly logger = new Logger(CreateNewSpace.name);
    constructor(
        public readonly spaceModel: typeof Spaces,
        public readonly userModel: typeof User
    ){}

    create = async ({input, user }: ControllerArgs) => {
        const { name, description } = input;

        // this.logger.log('checking if space already exists');
        const spaceExists = await this.spaceModel.findOne({ where: { name }});
        if(spaceExists) throw new ConflictError('Space already exists');

        // this.logger.log('Creating space');
        let space = await this.spaceModel.create({
            name,
            description,
            visibility: "pr", //TODO:
            spaceOwner: user?.id as string,
        })

        space = await space.save();

        // everytime someone creates a space emit an events that 

        return {
            message: "Space created, enjoy your voyage",
            data: space,
        }
    }
}