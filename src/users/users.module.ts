import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {UsersController} from "./users.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
