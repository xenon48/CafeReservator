import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Reservation } from "src/entities/reservation.entity";
import { Status } from "src/entities/status.entity";
import { Table } from "src/entities/table.entity";
import { User } from "src/entities/user.entity";

export default (configService: ConfigService): TypeOrmModuleOptions => ({
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  database: configService.get<string>("DB_BASE"),
  schema: configService.get<string>("DB_SCHEMA"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  synchronize: true,
  entities: [
    User,
    Reservation,
    Table,
    Status,
  ],
});