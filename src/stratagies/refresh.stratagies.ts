import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from "@nestjs/common";


@Injectable()
export class RefreshStategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'rt-secret',
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any) {
        const refreshToken = req.get('authorization').toLowerCase().replace('Bearer', '').trim();
        return { 
            ...payload, 
            refreshToken 
        };
    }
}