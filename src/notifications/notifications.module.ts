import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}
