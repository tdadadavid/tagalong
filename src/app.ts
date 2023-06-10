import express, { Application } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { AddressInfo } from "node:net";

import { baseRouter } from "./app.router";
import { config } from "./core";
import setUpWebSocketServer   from "./app.module";
import { Conversations, Messages } from "./conversations/entities";


const app: Application = express();

//TODO: implement ratelimiting.
app.use(express.json());
app.disable('x-powered-by');
app.use('/api/v1', baseRouter);

Conversations.hasMany(Messages, { foreignKey: 'conversation_id'})



const startApp = () => {
    const httpServer = createServer(app);

    // create socket server
    const ioServer = new Server(httpServer, {
        transports: ['websocket']
    });

    setUpWebSocketServer(ioServer);
    
    // start server on port.
    httpServer.listen(config.port, () => {
        console.log(`sever listening on ${(httpServer.address() as AddressInfo).port}`)
    });
}
 

export default startApp;