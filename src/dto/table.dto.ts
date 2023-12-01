import { ApiProperty } from "@nestjs/swagger";
import { Table } from "src/entities/table.entity";

export class TableDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    size: number;
    @ApiProperty()
    active: boolean;
    // @ApiProperty({ type: reservationDto})
    // reservations: Reservation[];

    constructor(table: Table) {
        this.id = table.id;
        this.size = table.size;
        this.active = table.active;
    }
}

export class TableExtendsDto extends TableDto {
    @ApiProperty()
    free: boolean;

    constructor(table: Table) {
        super(table),
        this.free = table.free;
    }
}