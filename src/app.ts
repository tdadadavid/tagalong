import express, { Application } from "express";
import { baseRouter } from "./app.module";
import { config,crendentials } from "./core";


const app: Application = express();

//TODO: implement ratelimiting.
app.use(express.json());
// app.use(crendentials);
app.disable('x-powered-by');
app.use(config.baseApiPath, baseRouter);

export default app;