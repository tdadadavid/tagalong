import { Router } from "express";
import { authRouter } from "./auth";

export const baseRouter = Router()
baseRouter.use("/auth", authRouter);
