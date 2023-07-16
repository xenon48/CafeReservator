import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    name: string;

    @ApiProperty()
    @Column({ nullable: false })
    login: string;

    @ApiProperty()
    @Column({ nullable: false })
    password: string;

    @ApiProperty()
    @Column({ nullable: true })
    role: string;

    @ApiProperty()
    @Column({ nullable: true })
    telegram: string;

    @ApiProperty()
    @Column({ nullable: true })
    phone: string;
}