import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {

    private bot: any;
    private chatId: string;

    constructor(configService: ConfigService) {
        this.chatId = configService.get<string>("TELEGRAM_CHAT_ID");
        const token = configService.get<string>("TELEGRAM_BOT_TOKEN");
        this.bot = new TelegramBot(token);

        // this.sendMessageToTelegramChat("Hello");
    }
    
    async sendMessageToTelegramChat(message: string) {
        try {
            await this.bot.sendMessage(this.chatId, message)
        } catch (error) { }
    }
}
