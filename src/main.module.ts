import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TableModule } from "./tables/table.module";
import dotenvConfig from "./configs/dotenv.config";
import ormConfig from "./configs/orm.config";


@Module({
  imports: [
    UserModule,
    ReservationModule,
    TableModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ormConfig,
    }),
    ConfigModule.forRoot(dotenvConfig),
    AuthModule
]
})
export class MainModule {

}