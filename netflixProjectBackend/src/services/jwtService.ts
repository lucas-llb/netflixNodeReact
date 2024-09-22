import jwt from 'jsonwebtoken'

const secret = 'key-jwt'

export const jwtService = {
    getToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload, secret, { expiresIn: expiration });
    },

    verifyToken: (token: string, callbackfn: (jwt.VerifyCallback)) => {
        jwt.verify(token, secret, callbackfn);
    }
}