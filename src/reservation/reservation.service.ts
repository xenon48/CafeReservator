import { HttpException, Injectable } from '@nestjs/common';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeepPartial, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Table } from 'src/entities/table.entity';
import { Status } from 'src/entities/status.entity';

function generateEndTime(dateStart: Date) {
    const tempDate = new Date(dateStart);
    tempDate.setHours(tempDate.getHours() + 3);
    return tempDate;
}

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        @InjectRepository(Table)
        private tableRepository: Repository<Table>,
        @InjectRepository(Status)
        private statusRepository: Repository<Status>
    ) { }

    async getAll(from?: string, to?: string) {
        let searhOptins = null;
        if (from && !to) { searhOptins = { dateStart: MoreThanOrEqual(from) } }
        else if (!from && to) { searhOptins = { dateStart: LessThanOrEqual(to) } }
        else if (from && to) { searhOptins = { dateStart: Between(from, to) } }
        try {
            return await this.reservationRepository.find({ relations: ['table', 'status'], where: searhOptins, order: { dateStart: 'ASC'} });
        } catch (error) {
            throw new Error(`Ошибка получения данных: ${error.message}`);
        }
    }

    async getOne(id: number) {
        try {
            return await this.reservationRepository.findOne({ where: { id }, relations: ['table', 'status'] });
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async createOne(dto) {
        try {
            const table = await this.tableRepository.exist(dto.table);
            if (!table) { throw new HttpException(`Стол с ID: '${dto.table}' не найден`, 400) }
            if (!dto.status) { dto.status = 'waiting' };
            if (!dto.dateEnd) { dto.dateEnd = generateEndTime(dto.dateStart) };
            return await this.reservationRepository.save(dto);
        } catch (error) {
            throw new HttpException(`Ошибка БД: ${error.message}`, error.status || 500);
        }
    }

    async editOne(dto: createReservationDto, id: string) {
        try {

        } catch (error) {
            throw new Error(`Ошибка обновления данных: ${error.message}`);
        }
    }

    async delete(id: number) {            
        return await this.reservationRepository.delete(id);
    }
}
