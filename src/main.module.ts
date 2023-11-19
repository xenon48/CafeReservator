import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TableModule } from "./tables/table.module";
import { StatusModule } from './status/status.module';
import dotenvConfig from "./configs/dotenv.config";
import ormConfig from "./configs/orm.config";
import { TaskModule } from "./task/task.module";
import { RequestModule } from './request/request.module';


@Module({
  imports: [
    RequestModule,
    TaskModule,
    AuthModule,
    UserModule,
    TableModule,
    StatusModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ormConfig,
    }),
    ConfigModule.forRoot(dotenvConfig),
    RequestModule,
  ],
  providers: []
})
export class MainModule { }