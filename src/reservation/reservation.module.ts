import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { Table } from 'src/entities/table.entity';
import { Status } from 'src/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Table, Status])
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule { }
