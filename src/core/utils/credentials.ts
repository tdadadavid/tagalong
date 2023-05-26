import { Request, Response, NextFunction } from "express";
import {NotWhiteListedOriginError} from "../errors";
import {allowedOrigins} from "../constants";



export const crendentials = async (req: Request, _: Response, next: NextFunction) => {
    const origin = req.headers.origin as string;
    if (allowedOrigins.includes(origin)) next();
    next(new NotWhiteListedOriginError(`${origin} is blacklisted`))
}