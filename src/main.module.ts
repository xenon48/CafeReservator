import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { Reservation } from "./reservation/reservation.entity";
import { Table } from "./tables/table.entity";
import { TableModule } from "./tables/table.module";

@Module({
  imports: [
    UserModule,
    ReservationModule,
    TableModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      schema: 'public',
      entities: [User, Reservation, Table],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule
]
})
export class MainModule {

}