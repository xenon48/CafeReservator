import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from '../entities/table.entity';
import { MoreThanOrEqual, Repository, Not, In, MoreThan, LessThan } from 'typeorm';
import { ReservationService } from 'src/reservation/reservation.service';
import { Reservation } from 'src/entities/reservation.entity';
import { generateEndTime } from 'src/utils/utils';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(Table)
        private tableRepository: Repository<Table>,
        @Inject(ReservationService)
        private reservationService: ReservationService,
    ) { }

    async getAll() {
        return await this.tableRepository.find();
    }

    async getAllWithReservations() {
        return await this.tableRepository.find({ relations: { reservations: true } });
    }

    async getOne(id: string) {
        return await this.tableRepository.findOneBy({ id });
    }

    async getFree(time: string): Promise<string[]> {
        const reservationsOnThisTime: Reservation[] = await this.reservationService.getAllActive();
        let reservedTablesIds: string[] = [];
        const estimatedStartTimeInSecs = +new Date(time);
        const estimatedEndTimeInSecs = +new Date(generateEndTime(time));
        reservationsOnThisTime.forEach( reservation => {
            const startTimeInSecs = +new Date(reservation.dateStart)
            const endTimeInSecs = +new Date(reservation.dateEnd)
            if (estimatedEndTimeInSecs >= startTimeInSecs && estimatedStartTimeInSecs < endTimeInSecs) reservedTablesIds.push(reservation.table.id)
        })
        reservedTablesIds = [...new Set(reservedTablesIds)]; // убираем повторения
        return reservedTablesIds;
    }

}
