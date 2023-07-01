import { ApiProperty } from "@nestjs/swagger";
import { Reservation } from "src/reservation/reservation.schema";

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
    dateStart: string;
    @ApiProperty()
    dateEnd: string;
    @ApiProperty()
    dateCreate: string;
    @ApiProperty()
    dateUpdate: string;

    constructor(obj) {
        this.id = obj._id;
        this.name = obj.name;
        this.table = obj.table;
        this.phone = obj.phone;
        this.dateStart = obj.dateStart;
        this.dateEnd = obj.dateEnd;
        this.dateCreate = obj.dateCreate;
        this.dateUpdate = obj.dateUpdate;
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
    dateStart: string;
    @ApiProperty()
    dateEnd: string;

    constructor(obj: Reservation) {
        this.name = obj.name;
        this.table = obj.table;
        this.phone = obj.phone;
        this.dateStart = obj.dateStart;
        this.dateEnd = obj.dateEnd;
    }
}