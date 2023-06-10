import { Router } from "express";
import { seeUserInformation, viewUserChats } from "../users.module";
import { controllerHandler } from "../../core";


export const userRouter = Router();

userRouter
    .get('/info', controllerHandler(seeUserInformation.view))
    .get('/chats', controllerHandler(viewUserChats.veiw));