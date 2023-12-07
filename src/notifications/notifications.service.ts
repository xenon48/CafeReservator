import { Injectable } from '@nestjs/common';
import * as Firebase from 'firebase-admin';

@Injectable()
export class NotificationsService {
    constructor() {

        // Initialize Firebase
        Firebase.initializeApp({ credential: Firebase.credential.cert('src/configs/firebase-adminsdk.json') });
        const token = 'fuYyfYb0PMRqQ7dUUlI0bq:APA91bETbixONBM3mcNBYIsKiQHlWuSQipUAkAVGKEIf9m_st1AL_gIInyw-kOJstdS6UMeYq8plNADJKpd8HZ6p0bplfV0AFwJL2sh1F4bDpiPLp6svrkKxcQi9YKy-MNtcRAJP68kc'
        this.sendPush(token, 'Test', 'Отправлено из бека на NestJS')

    }

    async sendPush(token: string, title: string, body: string) {
        const message = {
            token,
            notification: {
                title,
                body
            },
        };

        try {
            const response = await Firebase.messaging().send(message);
            console.log('Successfully sent message:', response);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}
