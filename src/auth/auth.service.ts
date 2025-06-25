import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as process from "node:process";

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
            lastName: user._doc.lastName,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 час
        };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
        });

        return { access_token: token };
    }
}