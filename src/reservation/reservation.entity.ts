import { ApiProperty } from '@nestjs/swagger';
import { Table } from 'src/tables/table.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

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
    @ManyToOne(() => Table, table => table.reservations)
    @JoinColumn({ name: 'tableId', referencedColumnName: 'id' })
    table: Table;

    @ApiProperty()
    @Column({ nullable: false, default: true })
    active: boolean;

    @ApiProperty()
    @Column({ nullable: false })
    dateStart: Date;

    @ApiProperty()
    @Column({ nullable: false })
    dateEnd: Date;
}