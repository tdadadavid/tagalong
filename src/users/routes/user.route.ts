import { Router } from "express";


export const userRouter = Router();

userRouter
    .get('/info')
    .get('chats')
    .post('conversation:start')
    .post('consversation:block')
    .post('conversation:chats')
