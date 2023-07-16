import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from '../entities/table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table)
        private tableRepository: Repository<Table>
    ) { }

    async getAll() {
        return await this.tableRepository.find();
    }

    async getOne(id: string) {
        return await this.tableRepository.findOneBy({ id });
    }
}
