import { IncomingHttpHeaders } from 'http';
import { ObjectSchema } from 'joi';

export interface ControllerArgs {
    input?: any;
    params?: any;
    query?: any;
    body?: any,
    files?: null | undefined;
    user?: TokenUser  | undefined | null;
    headers?: IncomingHttpHeaders,
}

export interface ValidationSchema {
  inputSchema?: ObjectSchema;
  paramsSchema?: ObjectSchema;
  querySchema?: ObjectSchema;
}

export interface TokenUser {
    id: string;
    role: string;
}

export interface IEmail {
    fileName: string;
    data: Object;
    email: string;
    subject?: string;
}