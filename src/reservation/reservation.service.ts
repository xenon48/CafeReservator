import { Injectable } from '@nestjs/common';
import { createReservationDto } from 'src/dto/reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Table } from 'src/entities/table.entity';
import { generateEndTime, setTimezone } from 'src/utils/utils';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
    ) { }

    async getAll(from?: string, to?: string, table?: string) {
        let whereOptions = null;
        if (from && !to) { whereOptions = { dateStart: MoreThanOrEqual(from) } }
        else if (!from && to) { whereOptions = { dateStart: LessThanOrEqual(to) } }
        else if (from && to) { whereOptions = { dateStart: Between(from, to) } }
        if (table) whereOptions = { ...whereOptions, table: { id: table } }
        try {
            return await this.reservationRepository.find({ relations: ['table', 'status'], where: whereOptions, order: { dateStart: 'ASC' } });
        } catch (error) {
            throw new Error(`Ошибка получения данных: ${error.message}`);
        }
    }

    async getAllActive() {
        try {
            return await this.reservationRepository.find({ relations: ['table', 'status'], where: { status: { id: In(['started', 'request', 'waiting']) } }, order: { dateStart: 'ASC' } });
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

    async deactivateByCron(date) {
        const reservations = await this.reservationRepository.find({
            where: { dateEnd: LessThan(date), status: { id: In(['started', 'waiting']) } },
        });
        if (reservations.length) {
            for (const reservation of reservations) {
                const editedReservation = {
                    ...reservation,
                    status: 'completed'
                }
                await this.save(editedReservation);
            }
        }
    }
}
