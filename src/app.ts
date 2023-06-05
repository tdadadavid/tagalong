import express, { Application } from "express";

import { baseRouter } from "./app.router";


const app: Application = express();

//TODO: implement ratelimiting.
app.use(express.json());
// app.use(crendentials);
app.disable('x-powered-by');
app.use('/api/v1', baseRouter);


export default app;
