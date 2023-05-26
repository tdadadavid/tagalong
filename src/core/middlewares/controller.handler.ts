import { NextFunction, Request, Response } from 'express';
import { UnProcessableError } from '../errors';
import {
    AnyFunction,
    ControllerArgs,
    ValidationSchema
} from '../types';
import { joiValidate } from '../utils';

function parseControllerArgs(req: Request): ControllerArgs {
    return {
        input: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
        user: req.user,
    };
}

export const controllerHandler = (controllerFn: AnyFunction, schema: ValidationSchema | undefined = {}):
        ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const controllerArgs = parseControllerArgs(req);
            const { input, params, query } = controllerArgs;

            try {
                if (schema) {
                    const { querySchema, paramsSchema, inputSchema } = schema;

                    try {
                        if (inputSchema)
                            joiValidate(inputSchema, input);
                        if (querySchema)
                            joiValidate(querySchema, query);
                        if (paramsSchema)
                            joiValidate(paramsSchema, params);
                    } catch (error : any) {                        
                        throw new UnProcessableError(
                            error.message.replaceAll('\"', ''));
                    }
                }

                const controllerResult =
                    await controllerFn(controllerArgs);
                if (!controllerResult) {
                    res.status(200).send({ status: true });
                    return;
                };

                const { code, ...data } = controllerResult;
                res.status(code ?? 200).send(data);
            } catch (error) {
                next(error)
            }
    }
}