import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.authUser({ email, password });
        if (!user) return null;
        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = {
            id: user._doc._id,
            email: user._doc.email,
            firstName: user._doc.firstName,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 час
        };
        console.log(payload);
        const token = this.jwtService.sign(payload, {
            secret: "h6Fz@93kdP!vq2rX9$GqLz7nM3!YtBvK"
        });

        return { access_token: token };
    }
}