import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/entities/status.entity';
import { StatusController } from './status.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status])
  ],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule { }
