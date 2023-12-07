import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { Request } from 'src/entities/request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TelegramBotModule,
    NotificationsModule,
    TypeOrmModule.forFeature([Request])
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService]
})
export class RequestModule {}
