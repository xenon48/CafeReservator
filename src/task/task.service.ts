import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReservationService } from 'src/reservation/reservation.service';
import { castToTimezone } from 'src/utils/utils';

@Injectable()
export class TasksService {
    constructor(
        private reservationsService: ReservationService
    ) { }

    @Cron(CronExpression.EVERY_5_MINUTES)
    handleCron() {
        const thisDate = castToTimezone(new Date());
        console.log(thisDate);
        this.reservationsService.deactivateByCron(thisDate);
    }
}