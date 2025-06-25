import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: "h6Fz@93kdP!vq2rX9$GqLz7nM3!YtBvK",
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
