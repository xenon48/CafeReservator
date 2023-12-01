import { ApiProperty } from "@nestjs/swagger";
import { Request } from "src/entities/request.entity";
import { formatTime } from "src/utils/utils";

export class RequestDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    guestName: string;
    @ApiProperty()
    guestPhone: string;
    @ApiProperty()
    persons: number;
    @ApiProperty()
    actual: boolean;
    @ApiProperty({ type: Date })
    dateStart: Date | string;
    @ApiProperty({ type: Date })
    dateCreate: Date | string;
    @ApiProperty()
    note: string;

    constructor(obj: Request) {
        this.id = obj.id;
        this.guestName = obj.guestName;
        this.guestPhone = obj.guestPhone;
        this.persons = obj.persons;
        this.actual = obj.actual;
        this.note = obj.note;
        this.dateStart = formatTime(obj.dateStart)
        this.dateCreate = formatTime(obj.dateCreate)
    }
}

export class CreateRequestDto {
    @ApiProperty({ required: true })
    guestName: string;
    @ApiProperty({ required: true })
    guestPhone: string;
    @ApiProperty({ required: true })
    persons: number;
    @ApiProperty({ required: true })
    dateStart: string;
    @ApiProperty()
    note?: string;
}