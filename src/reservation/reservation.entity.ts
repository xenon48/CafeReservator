import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reservations')
export class Reservation {
    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: true })
    guestName: string;

    @ApiProperty()
    @Column({ nullable: false })
    guestPhone: string;

    @ApiProperty()
    @Column({ nullable: false })
    tableId: number;

    @ApiProperty()
    @Column({ nullable: false, default: true })
    active: boolean;

    @ApiProperty()
    @Column({ nullable: false })
    dateStart: Date;

    @ApiProperty()
    @Column({ nullable: true })
    dateEnd: Date;
}