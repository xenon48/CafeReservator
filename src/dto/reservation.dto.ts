import { ApiProperty } from "@nestjs/swagger";
import { Reservation } from "src/reservation/reservation.schema";
import * as moment from 'moment-timezone'

enum configTimezones {
    timeZone = 'Europe/Moscow',
    format = 'YYYY-MM-DDTHH:mm'
}

function formatTime (date: Date) {
    if (date) {
        return moment(date).tz(configTimezones.timeZone).format(configTimezones.format);
    } else { return null }
}

export class reservationDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    table: number;
    @ApiProperty()
    phone: number;
    @ApiProperty()
    dateStart: Date | string;
    @ApiProperty()
    dateEnd: Date | string;
    @ApiProperty()
    dateCreate: Date | string;
    @ApiProperty()
    dateUpdate: Date | string;

    constructor(obj) {
        this.id = obj._id;
        this.name = obj.name;
        this.table = obj.table;
        this.phone = obj.phone;
        this.dateStart = formatTime(obj.dateStart)
        this.dateEnd = formatTime(obj.dateEnd)
        this.dateCreate = formatTime(obj.dateCreate)
        this.dateUpdate = formatTime(obj.dateUpdate)
    }
}

export class createReservationDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    table: number;
    @ApiProperty()
    phone: number;
    @ApiProperty()
    dateStart: Date;
    @ApiProperty()
    dateEnd: Date;

    constructor(obj: Reservation) {
        this.name = obj.name;
        this.table = obj.table;
        this.phone = obj.phone;
        this.dateStart = obj.dateStart;
        this.dateEnd = obj.dateEnd;
    }
}