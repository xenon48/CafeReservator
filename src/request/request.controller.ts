import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestService } from './request.service';
import { CreateRequestDto, RequestDto } from 'src/dto/request.dto';
import { Request } from 'src/entities/request.entity';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';

const TEMPLATE_FOR_TG: string = 'Новая заявка на бронь! ';

@Controller('request')
@ApiTags('Requests')
@UseGuards(AuthGuard)
export class RequestController {
    constructor(
        private requestService: RequestService,
        private telegramService: TelegramBotService
    ) { }

    @ApiOperation({ summary: 'Создать заявку' })
    @ApiResponse({ status: 201, type: RequestDto })
    @ApiBody({ type: CreateRequestDto, required: true })
    @Post()
    async create(@Body() dto: CreateRequestDto) {
        if (dto.guestPhone?.length !== 11) throw new HttpException('Длина номера телефона должна составлять 11 символов', 400)
        try {
            const savedRequest: Request = await this.requestService.create(dto);
            const messageForTg = `${TEMPLATE_FOR_TG}\nИмя: ${savedRequest.guestName}\nТелефон: ${savedRequest.guestPhone}`;
            await this.telegramService.sendMessageToTelegramChat(messageForTg);
            return new RequestDto(savedRequest);
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }
    }

    @ApiOperation({ summary: 'Получить все заявки' })
    @ApiResponse({ status: 200, type: [RequestDto] })
    // @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    // @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    @Get()
    async getAll() {
        try {
            const requests = await this.requestService.getAll();
            const respArr = requests.map(el => new RequestDto(el));
            return respArr;
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }
}
