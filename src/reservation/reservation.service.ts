import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './reservation.schema';
import { Model } from 'mongoose';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';
import * as moment from 'moment';

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name)
        private reservationRepository: Model<Reservation>
    ) { }

    async getAll(from?: string, to?: string) {
        try {
            if (from && to) {
                return await this.reservationRepository.find({ dateField: { $gte: from, $lte: to } }).exec();
            }
            else {
                return await this.reservationRepository.find().exec();
            }
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
            const createdObj = new this.reservationRepository(dto);
            createdObj.dateCreate = moment().format();
            createdObj.dateEnd = moment(dto.dateStart).add(3, 'hours').format();
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
                ...reservation,
                ...dto,
                dateUpdate: new Date().toDateString(),
            }
            newReservation.dateEnd = dto.dateEnd ?? moment(newReservation.dateStart).add(3, 'hours').format();
            return await this.reservationRepository.findByIdAndUpdate(reservation._id, newReservation);
        } catch (error) {
            throw new Error(`Ошибка обновления данных: ${error.message}`);
        }
    }

    async delete(id: string) {
        return await this.reservationRepository.findByIdAndDelete(id);
    }
}
