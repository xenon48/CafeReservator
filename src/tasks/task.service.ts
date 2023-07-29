import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReservationService } from 'src/reservation/reservation.service';
import { formatTime } from 'src/utils/utils';

@Injectable()
export class TasksService {
    constructor(
        private reservationsService: ReservationService
    ) { }

    @Cron(CronExpression.EVERY_10_MINUTES)
    handleCron() {
        const thisDate = formatTime(new Date());
        this.reservationsService.deactivateByCron(thisDate);
    }
}