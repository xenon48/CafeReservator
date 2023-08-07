import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    name: string;

    @ApiProperty()
    @Column({ nullable: false, unique: true })
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