import dotenv from 'dotenv'
dotenv.config();

export const config = Object.freeze({

    // app
    port: process.env.PORT as unknown as number,
    baseApiPath: process.env.BASE_API_PATH as string,

    //database
    pgPassword: process.env.PG_PASSWORD as string,
    pgUSER: process.env.PG_USER as string,
    dbName: process.env.PG_DATABASE as string,
    dbHost: process.env.PG_HOST as string,

    //jwt
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    inviteTokenSecret: process.env.INVITE_TOKEN_SECRET as string,
    inviteTokenExpiresIn: process.env.INVITE_TOKEN_EXPIRES_IN as string,

});

export const enum Role {
    User = 'PUBLIC USER',
    Admin = 'ADMIN',
    SuperAdmin = 'SUPER ADMIN'
};

