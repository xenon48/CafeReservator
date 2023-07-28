import { ApiProperty } from '@nestjs/swagger';
import { Table } from 'src/entities/table.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.entity';

@Entity('reservations')
export class Reservation {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: true })
    guestName: string;

    @ApiProperty()
    @Column({ nullable: false })
    guestPhone: string;

    @ApiProperty()
    @Column({ nullable: false })
    persons: number;

    @ApiProperty()
    @ManyToOne(() => Table, table => table.reservations, { nullable: false })
    @JoinColumn({ name: 'tableId', referencedColumnName: 'id' })
    table: Table;

    @ApiProperty()
    @ManyToOne(() => Status, status => status.reservations, { nullable: false, })
    @JoinColumn({ name: 'statusId', referencedColumnName: 'id' })
    status: Status;

    @ApiProperty()
    @Column({ nullable: false })
    dateStart: Date;

    @ApiProperty()
    @Column({ nullable: false })
    dateEnd: Date;

    @ApiProperty()
    @Column({ nullable: false })
    createdBy: string;
}