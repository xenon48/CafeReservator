import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { createUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<User>
    ) { }
    
    async findByLogin(email: string) {
        return await this.userRepository.findOne().where('login').equals(email).exec();
    }

    async findAll() {
        return await this.userRepository.find().exec();
    }

    async createOne(dto: createUserDto) {
        const newItem = new this.userRepository(dto)
        return await newItem.save();
    }

}
