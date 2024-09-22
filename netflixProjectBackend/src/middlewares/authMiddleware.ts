import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null;
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader){
        return res.status(401).json({ message: 'Not Authorized. Token not found.'})
    }

    const token = authorizationHeader.replace(/Bearer /, '');

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined'){
            res.status(401).json({ message: 'Invalid token'})
        }

        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user;
            next();
        })
    })
}

export function ensureAuthByQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { token } = req.query;

    if (!token){
        return res.status(401).json({ message: 'Not Authorized. Token not found.'})
    }

    if (typeof token !== 'string'){
        res.status(401).json({ message: 'Invalid token'})
    }

    jwtService.verifyToken(token as string, async (err, decoded) => {
        if(err || typeof decoded === 'undefined'){
            res.status(401).json({ message: 'Invalid token'})
        }

        const user = await userService.findByEmail((decoded as JwtPayload).email);
        req.user = user;
        next();
    })
}