import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Table } from 'src/tables/table.entity';
import { TableService } from 'src/tables/table.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Table])
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule { }
