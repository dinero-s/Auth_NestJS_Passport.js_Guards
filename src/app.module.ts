import {forwardRef, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import {AuthService} from "./auth/auth.service";
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {UsersService} from "./users/users.service";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      AuthModule,
      MongooseModule.forRoot('mongodb://localhost/nest'),
      UsersModule,
      JwtModule,
      ConfigModule.forRoot({
      isGlobal: true,
  })
          ],
  controllers: [AppController, UsersController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
