import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Reservation } from "src/reservation/reservation.entity";
import { Table } from "src/tables/table.entity";
import { User } from "src/user/user.entity";

export default (configService: ConfigService): TypeOrmModuleOptions => ({
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  database: configService.get<string>("DB_BASE"),
  schema: configService.get<string>("DB_SCHEMA"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  synchronize: false,
  entities: [
    User,
    Reservation,
    Table
  ],
});