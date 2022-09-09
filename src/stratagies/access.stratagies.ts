import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from 'passport-jwt';
//import {ExtractJwt, Strategy} from "@nest/passport-local";
import { Strategy } from 'passport-local';


type JwtPayload = {
  sub: string,
  email: string
}

@Injectable()
export class AccessStategy extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'at-secret'
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}