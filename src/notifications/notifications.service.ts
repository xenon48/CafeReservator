import { Inject, Injectable } from '@nestjs/common';
import * as Firebase from 'firebase-admin';
import { UserService } from 'src/user/user.service';

const TITLE: string = 'Новая заявка!';
const BODY: string = 'Послупила новая заявка на столик!';

@Injectable()
export class NotificationsService {
    constructor(
        private userService: UserService
    ) {
        // Initialize Firebase
        Firebase.initializeApp({ credential: Firebase.credential.cert('src/configs/firebase-adminsdk.json') });
        // this.sendPush(token, 'Test', 'Отправлено из бека на NestJS');
    }

    async generateAndSendPushNewRequest(): Promise<void> {
        const fcmTokens: string[] = await this.userService.findAllFcmTokens();
        if (!fcmTokens.length) return null;
        for (const token of fcmTokens) {
            await this.sendPush(token, TITLE, BODY)
        }
    }

    async sendPush(token: string, title: string, body: string): Promise<void> {
        const message = {
            token,
            notification: {
                title,
                body
            },
        };
        try {
            await Firebase.messaging().send(message);
        } catch (error) {

        }
    }
}
