import { createServer } from 'http';
import { Server } from "socket.io";

import app from './app';
import { handleConnection } from './app.module';
import { initializeDbConnection, config } from './core';


initializeDbConnection({force: false})
.then(() => {
    // create http server
    const httpServer = createServer(app);

    // create socket server
    const socket = new Server(httpServer);

    // handle client connections.
    socket.on('connection', handleConnection)
    
    // start server on port.
    httpServer.listen(config.port, () => {
        console.log(`sever listening on ${config.port}`)
    });
})
.catch(console.log);