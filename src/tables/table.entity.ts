import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservation/reservation.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('tables')
export class Table {
    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    size: number;

    @OneToMany( () => Reservation, reservation => reservation.table )
    reservations: Reservation[];
}