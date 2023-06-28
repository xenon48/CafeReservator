import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './reservation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name)
        private reservationRepository: Model<Reservation>
    ) { }

    
}
