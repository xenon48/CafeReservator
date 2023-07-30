import { ApiProperty } from "@nestjs/swagger";
import { Table } from "src/entities/table.entity";
import { reservationDto } from "./reservation.dto";


export class tableDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    size: number;
    @ApiProperty()
    active: boolean;
    constructor(table: Table) {
        this.id = table.id;
        this.size = table.size;
        this.active = table.active;
    }
}

export class tableDetialDto extends tableDto {
    @ApiProperty({ type: [reservationDto] })
    reservations?: reservationDto[];
    constructor(table: Table) {
        super(table);
        this.reservations = table.reservations?.map(el => new reservationDto(el));
    }
}