import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/entities/reservation.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('tables')
export class Table {
    @ApiProperty()
    @PrimaryColumn()
    id: string;

    @ApiProperty()
    @Column({ nullable: false })
    size: number;

    @ApiProperty()
    @Column({ nullable: false, default: true })
    active: boolean;

    free?: boolean;

    @OneToMany( () => Reservation, reservation => reservation.table )
    reservations: Reservation[];
}