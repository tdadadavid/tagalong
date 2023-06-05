import { Socket, Server} from "socket.io";
import { createServer } from "node:http";
import { AddressInfo } from "node:net";

import app from "./app";
import { config } from "./core";

class HandleConnection {

    public static onConnection = (wsServer: Server, socket: Socket) => {
        wsServer.of('\\spaces:(+d)\/').on('connection', (socket: Socket) => {
            
        })
        // socket.on('create:space', handleNewChat);
        // socket.on('invite:user:space', inviteUserToSpace);
        // socket.on('join:space:user', joinSpace);
        // socket.on('remove:user:space', removeUserFromSpace);
        // socket.on('space:chat', spaceMessages);
    }

}

export default new HandleConnection



export const startApp = () => {
    const httpServer = createServer(app);

    // create socket server
    const wsServer = new Server(httpServer, {
        transports: ['websocket']
    });

    // handle client connections.
    wsServer.on('connection', (socket: Socket) => HandleConnection.onConnection(wsServer, socket))
    
    // start server on port.
    httpServer.listen(config.port, () => {
        console.log(`sever listening on ${(httpServer.address() as AddressInfo).port}`)
    });
}