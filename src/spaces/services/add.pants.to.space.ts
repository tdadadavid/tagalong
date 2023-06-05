import { Op } from "sequelize";
import { ConflictError, ControllerArgs, UnAuthorizedError } from "../../core";
import { User } from "../../users/entities/user";
import { SpacePants, Spaces } from "../entities";

type UserSpaceOptions = {
    userId: string;
    spaceId: string;
}


export class AddParticipantsToSpace {
    constructor(
        public readonly spaceModel: typeof Spaces,
        public readonly userModel: typeof User,
        public readonly spacePants: typeof SpacePants
    ){}

    add = async ({input, user}: ControllerArgs) => {
        const { email, participantId, spaceId } = input;

        const userValue: string = email ?? participantId;

        const spaceExist = await this.checkSpaceExists(spaceId);
        if(!spaceExist) throw new ConflictError('Space not in existence');

        const userExists = await this.checkUserIsAuthenticated(userValue);
        if(!userExists) throw new UnAuthorizedError('User not authenticated');

        //TODO: add authorization for space-admins & space owners.

        const userSpace: UserSpaceOptions = { userId: userExists.id, spaceId: spaceExist.space_id }

        const userIsSpacePant = await this.checkUserPresenceInSpace(userSpace);
        if(userIsSpacePant) throw new ConflictError('User is already a participant in this space.');

        await this.addUserToSpace(userSpace);

        return {
            message: "New participant added",
        }

    }

    private addUserToSpace = async (options: UserSpaceOptions): Promise<SpacePants> => {
        const newParticipant = await this.spacePants.create({
            space_id: options.spaceId,
            participant_id: options.userId
        });
        return await newParticipant.save()
    }

    private checkUserPresenceInSpace = async (options: UserSpaceOptions): Promise<SpacePants | null> => {
        return await this.spacePants.findOne({
            where: {
                [Op.and]: [
                    { space_id: options.spaceId },
                    { participant_id: options.userId }
                ]
            }
        })
    }

    private checkSpaceExists = async (spaceId: string): Promise<Spaces | null> => {
        return await this.spaceModel.findByPk(spaceId);
    }

    private checkUserIsAuthenticated = async (emailOrUserId: string): Promise<User | null> => {
        return this.userModel.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUserId },
                    { id: emailOrUserId }
                ]
            }
        })
    }
}