import { verify } from "jsonwebtoken";
import { Socket, Server } from "socket.io";
import { Conversations, Messages} from "./conversations/entities";
import { UnAuthorizedError } from "./core";
import { config } from "./core";
import { Op } from "sequelize";
import { User } from "./users/entities";


interface CustomSocket extends Socket {
    user?: { id: string, email: string }
    token?: string;
}

const authenticateUser = (socket: CustomSocket, next: (err?: any) => void) => {
    

    const token: string | undefined = socket.handshake.headers.authorization?.split(' ').pop();
    if(!token) {
        return next(new UnAuthorizedError("Authentication failed 🔒🔒🔒🔒🔒🔒"));
    }

    try {
        const decodedPayload = verify(token, config.accessTokenSecret) as any;
        socket.user = decodedPayload.user;
        next();
    }catch (err) {
        console.log(err);
        next(new Error("Authentication failed 🔥🔥🔥🔥🔥🔥🔥🔥🔥"));
    }
    
}


const setUpWebSocketServer = (server: Server) => {

    server.use(authenticateUser).on('connection', async (socket: CustomSocket) => {

        const user = socket.user!;
            console.log('user....', user);
            const conversations = await Conversations.findAll({
                where: {
                    [Op.or]: [
                        { first_participant: user.id },
                        { second_participant: user.id },
                    ]
                },
                include: Messages,
            });
            const response = JSON.stringify(conversations);
            socket.emit('conversations', response);

        // new message for a conversation btw two users.
        socket.on('new:msg', async (data: any)=> {

            console.log(data);
            const message = data.message;
            const reciepient = data.recipient;


            const sender = socket.user!;


            let conversation = await Conversations.findOne({
                where: {
                    first_participant: sender.id,
                    second_participant: reciepient
                },
            });

            if(!conversation) {
                conversation = await Conversations.create({
                    first_participant: sender.id,
                    second_participant: reciepient
                })
            }
            
            const newMessage = await Messages.create({
                conversation_id: conversation.conversation_id,
                message,
                sender: sender.id,
            });

            const braodcastData = JSON.stringify({
                message_id: message.id,
                message,
                sender,
                sentAt: newMessage.sentAt,
            });
            socket.broadcast.emit('message', braodcastData);
        })
    })


}

//TODO: Refactor this!!!

export default setUpWebSocketServer;
