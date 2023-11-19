import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('requests')
export class Request {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    guestName: string;

    @ApiProperty()
    @Column({ nullable: false, length: 11 })
    guestPhone: string;

    @ApiProperty()
    @Column({ nullable: false })
    persons: number;

    @ApiProperty()
    @Column({ nullable: false })
    dateStart: Date;

    @ApiProperty()
    @Column({ nullable: false })
    dateCreate: Date;

    @ApiProperty()
    @Column({ nullable: true })
    note: string;
}