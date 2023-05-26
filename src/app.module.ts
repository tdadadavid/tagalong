import { Router } from "express";
import { authRouter } from "./auth";
import { Socket } from "socket.io";


export const baseRouter = Router()
baseRouter.use("/auth", authRouter);



// Socket
export const handleConnection = (socket: Socket) => {
    // socket.on('create:space', handleNewChat);
    // socket.on('invite:user:space', inviteUserToSpace);
    // socket.on('join:space:user', joinSpace);
    // socket.on('remove:user:space', removeUserFromSpace);
    // socket.on('space:chat', spaceMessages);
}
