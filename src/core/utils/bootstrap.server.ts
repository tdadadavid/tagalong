import { config } from "../config";
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from '../../app';
import { handleConnection } from '../../app.module';

export const bootstrapServer = () => {
    const httpServer = createServer(app);

    const socket = new Server(httpServer);

    socket.on('connection', handleConnection)
    

    httpServer.listen(config.port, () => {
        console.log(`sever listening on ${config.port}`)
    });
}