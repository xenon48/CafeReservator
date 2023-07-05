import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tables')
export class Table {
    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    size: number;
}