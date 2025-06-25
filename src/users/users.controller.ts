import {Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {RegUserDto} from "./dto/reg.user.dto";
import {User} from "./schemas/user.schema";
import {AuthUserDto} from "./dto/auth.user.dto";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post('reg')
    async signup(@Body() user: RegUserDto): Promise<User> {
        return this.userService.regUser(user);
    }

    @Post('auth')
    async signin(@Body() user: AuthUserDto) {
        const validatedUser = await this.authService.validateUser(
            user.email,
            user.password
        );
        if (!validatedUser) {
            throw new UnauthorizedException();
        }
        return this.authService.login(validatedUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
