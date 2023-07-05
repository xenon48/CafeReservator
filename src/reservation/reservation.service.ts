import { Injectable } from '@nestjs/common';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';
import { Reservation } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

function generateEndTime(dateStart: Date) {
    const tempDate = new Date(dateStart);
    tempDate.setHours(tempDate.getHours() + 3);
    return tempDate;
}

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
    ) { }

    async getAll(from?: string, to?: string) {
        let searhOptins = null;
        if (from) {  }
        else if (to) {  }
        else if (from && to) {  }
        try {
            return await this.reservationRepository.find();
        } catch (error) {
            throw new Error(`Ошибка получения данных: ${error.message}`);
        }
    }

    async getOne(id: number) {
        try {
            return await this.reservationRepository.findOneBy({ id });
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async createOne(dto: createReservationDto) {
        try {
            if (!dto.dateEnd) { dto.dateEnd = generateEndTime(dto.dateStart) };
            return await this.reservationRepository.save(dto);
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async editOne(dto: createReservationDto, id: string) {
        try {
            
        } catch (error) {
            throw new Error(`Ошибка обновления данных: ${error.message}`);
        }
    }

    async delete(id: string) {
        return await this.reservationRepository.delete(id);
    }
}
