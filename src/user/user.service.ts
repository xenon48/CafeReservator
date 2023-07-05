import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/dto/user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }
    
    async findByLogin(login: string) {
        return await this.userRepository.findOneBy({ login });
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async createOne(dto: createUserDto) {
        const newItem = this.userRepository.create(dto)
        return await this.userRepository.save(newItem);
    }

}
