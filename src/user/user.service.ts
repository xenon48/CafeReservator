import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/dto/user.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }
    
    async findByLogin(login: string) {
        try {
            return await this.userRepository.findOneBy({ login });
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async findById(id: number) {
        try {
            return await this.userRepository.findOneBy({ id });
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async save(body) {
        try {
            return await this.userRepository.save(body);
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }
}
