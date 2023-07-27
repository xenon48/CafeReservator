import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private statusRepository: Repository<Status>
    ) { }

    async getAll() {
        try {
            return await this.statusRepository.find();
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async getOne(id: string) {
        try {
            return await this.statusRepository.findOneBy({ id });
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }
}