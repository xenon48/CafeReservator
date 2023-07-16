import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/entities/reservation.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('status')
export class Status {
    @ApiProperty()
    @PrimaryColumn()
    id: string;

    @ApiProperty()
    @Column({ nullable: false })
    title: string;

    @ApiProperty()
    @Column({ nullable: false })
    color: string;

    @OneToMany( () => Reservation, reservation => reservation.status )
    reservations: Reservation[];
}