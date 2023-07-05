import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { TableService } from './table.service';
import { TableController } from './table.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Table]),
  ],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule { }
