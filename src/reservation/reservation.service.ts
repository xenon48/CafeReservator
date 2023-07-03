import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './reservation.schema';
import { Model } from 'mongoose';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';

function generateEndTime(dateStart: Date) {
    const tempDate = new Date(dateStart);
    tempDate.setHours(tempDate.getHours() + 3);
    return tempDate;
}

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name)
        private reservationRepository: Model<Reservation>
    ) { }

    async getAll(from?: string, to?: string) {
        let searhOptins = null;
        if (from) { searhOptins = { dateStart: { $gte: new Date(from) } } }
        else if (to) { searhOptins = { dateStart: { $lte: new Date(to) } } }
        else if (from && to) { searhOptins = { dateStart: { $gte: new Date(from), $lte: new Date(to) } } }
        try {
            return await this.reservationRepository.find(searhOptins).exec();
        } catch (error) {
            throw new Error(`Ошибка получения данных: ${error.message}`);
        }
    }

    async getOne(id) {
        try {
            return await this.reservationRepository.findById(id).exec();
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async createOne(dto: createReservationDto) {
        try {
            const currentDate = new Date()
            if (!dto.dateEnd) { dto.dateEnd = generateEndTime(dto.dateStart) };
            const createdObj = new this.reservationRepository(dto);
            createdObj.dateCreate = currentDate;
            return await createdObj.save();
        } catch (error) {
            throw new Error(`Ошибка БД: ${error.message}`);
        }
    }

    async editOne(dto: createReservationDto, id: string) {
        try {
            let reservation = await this.reservationRepository.findById(id);
            if (!reservation) { throw new Error('Объект не найден') }
            let newReservation = {
                // ...reservation,
                ...dto,
                dateUpdate: new Date()
            }
            // newReservation.dateStart = new Date(newReservation.dateStart)
            if (!newReservation.dateEnd) { newReservation.dateEnd = generateEndTime(newReservation.dateStart) };
            return await this.reservationRepository.findByIdAndUpdate(reservation._id, newReservation, { new: true });
        } catch (error) {
            throw new Error(`Ошибка обновления данных: ${error.message}`);
        }
    }

    async delete(id: string) {
        return await this.reservationRepository.findByIdAndDelete(id);
    }
}
