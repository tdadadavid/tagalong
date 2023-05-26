import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken =
    (user: { id: string, email: string }, secretKey: string, expiresIn : number) => {
        return jwt.sign({ user }, secretKey,
            { expiresIn });
}

export const verifyToken =
    (token: string, secretKey: string) : JwtPayload => {
    return jwt.verify(token, secretKey) as JwtPayload;
}

export const generateAdminInviteToken = (invited: { email: string }, secretKey: string, expiresIn: number) => {
    return jwt.sign({ invited }, secretKey, { expiresIn });
}

export const verifyAdminInviteToken = (token: string, secretKey: string) => {
    return jwt.verify(token, secretKey) as JwtPayload;
}