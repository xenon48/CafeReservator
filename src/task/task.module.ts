import { Module } from "@nestjs/common";
import { TasksService } from "./task.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ReservationModule } from "src/reservation/reservation.module";


@Module({
  imports: [
    ReservationModule,
    ScheduleModule.forRoot(),
  ],
  providers: [TasksService]
})
export class TaskModule { }
