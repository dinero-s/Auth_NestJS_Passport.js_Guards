import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import IUser from "../interfaces/user.interface";

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string
}

export type UserDocument = HydratedDocument<IUser>;
export const UserSchema = SchemaFactory.createForClass(User);