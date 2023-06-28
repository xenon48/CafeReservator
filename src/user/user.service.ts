import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<User>
    ) { }
    
    async findByLogin(email: string) {
        return await this.userRepository.findOne().where('login').equals(email).exec();
    }

}
