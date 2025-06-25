import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "h6Fz@93kdP!vq2rX9$GqLz7nM3!YtBvK"
        });
    }

    async validate(payload: any) {
        console.log('Token payload received:', payload); // Лог входящего payload

        if (!payload.id) {
            console.error('Missing id in payload');
            throw new UnauthorizedException();
        }

        return {
            id: payload.id,
            email: payload.email,
            firstName: payload.firstName
        };
    }
}