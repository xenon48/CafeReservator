import { HttpException, Injectable } from '@nestjs/common';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Table } from 'src/entities/table.entity';
import { Status } from 'src/entities/status.entity';
import { generateEndTime, setTimezone } from 'src/utils/utils';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        @InjectRepository(Table)
        private tableRepository: Repository<Table>,
    ) { }

    async getAll(from?: string, to?: string) {
        let searhOptins = null;
        if (from && !to) { searhOptins = { dateStart: MoreThanOrEqual(from) } }
        else if (!from && to) { searhOptins = { dateStart: LessThanOrEqual(to) } }
        else if (from && to) { searhOptins = { dateStart: Between(from, to) } }
        try {
            return await this.reservationRepository.find({ relations: ['table', 'status'], where: searhOptins, order: { dateStart: 'ASC' } });
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
            if (!dto.status) dto.status = 'waiting';
            dto.dateStart = setTimezone(dto.dateStart);
            if (!dto.dateEnd) {
                dto.dateEnd = generateEndTime(dto.dateStart)
            } else dto.dateEnd = setTimezone(dto.dateEnd);
            return await this.save(dto);
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async editOne(reservation: Reservation, dto: createReservationDto) {
        try {
            let newReservation = {
                ...reservation,
                ...dto,
                dateStart: setTimezone(dto.dateStart)
            }
            if (!dto.dateEnd) {
                newReservation.dateEnd = generateEndTime(newReservation.dateStart)
            } else newReservation.dateEnd = setTimezone(dto.dateEnd);
            return await this.save(newReservation);
        } catch (error) {
            throw new Error(`Ошибка обновления данных: ${error.message}`);
        }
    }

    async delete(id: number) {
        return await this.reservationRepository.delete(id);
    }

    async save(dto) {
        try {
            await this.reservationRepository.save(dto);
        } catch (error) {
            throw new Error(`Ошибка сохранения данных: ${error.message}`);
        }
    }
}
