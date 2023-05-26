import {Router} from "express";
import { controllerHandler } from "../../core";
import { loginUser, registerUser } from "../auth.module";

export const authRouter = Router();

authRouter
    .post('/registration', controllerHandler(registerUser.register))
    .post('/login', controllerHandler(loginUser.login))

//TODO: implement rate limiting for login.