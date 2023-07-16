import { ApiProperty } from "@nestjs/swagger";
import * as moment from 'moment-timezone'
import { Reservation } from "src/entities/reservation.entity";
import { Status } from "src/entities/status.entity";
import { Table } from "src/entities/table.entity";

enum configTimezones {
    timeZone = 'Europe/Moscow',
    format = 'YYYY-MM-DDTHH:mm'
}

function formatTime(date: Date) {
    if (date) {
        return moment(date).tz(configTimezones.timeZone).format(configTimezones.format);
    } else { return null }
}

export class reservationDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    guestName: string;
    @ApiProperty()
    guestPhone: string;
    @ApiProperty()
    table: Table;
    @ApiProperty()
    persons: number;
    @ApiProperty()
    status: Status;
    @ApiProperty({ type: Date })
    dateStart: Date | string;
    @ApiProperty({ type: Date })
    dateEnd: Date | string;

    constructor(obj: Reservation) {
        this.id = obj.id;
        this.guestName = obj.guestName;
        this.guestPhone = obj.guestPhone;
        this.table = obj.table;
        this.status = obj.status;
        this.persons = obj.persons;
        this.dateStart = formatTime(obj.dateStart)
        this.dateEnd = formatTime(obj.dateEnd)
    }
}

export class createReservationDto {
    @ApiProperty()
    guestName: string;
    @ApiProperty()
    guestPhone: string;
    @ApiProperty()
    table: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    persons: number;
    @ApiProperty()
    dateStart: Date;
    @ApiProperty()
    dateEnd: Date;

}