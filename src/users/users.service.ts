import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schemas/user.schema";
import {Model} from "mongoose";
import {RegUserDto} from "./dto/reg.user.dto";
import {AuthUserDto} from "./dto/auth.user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async regUser(user: RegUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createdUser = new this.userModel({
            ...user,
            password: hashedPassword
        });
        return createdUser.save();
    }

    async authUser(user: AuthUserDto): Promise<User | null> {
        const userDB = await this.userModel.findOne({ email: user.email }).exec();
        if (!userDB) return null;

        const isMatch = await bcrypt.compare(user.password, userDB.password);
        return isMatch ? userDB : null;
    }

    async findOne(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
}
