import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from '../entities/table.entity';
import { LessThan, MoreThanOrEqual, Repository, Not } from 'typeorm';
import { addHours, generateEndTime } from 'src/utils/utils';

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

    // async getFree(time: Date | string, persons: number) {
    //     return await this.tableRepository.find({
    //         where: {
    //             size: MoreThanOrEqual(persons),
    //             reservations: { dateStart: MoreThanOrEqual(time), dateEnd: LessThan(generateEndTime(time)) },
    //         }
    //     })
    // }
}
