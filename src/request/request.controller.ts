import { Body, Controller, Get, HttpException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestService } from './request.service';
import { CreateRequestDto, RequestDto } from 'src/dto/request.dto';
import { Request } from 'src/entities/request.entity';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';
import { NotificationsService } from 'src/notifications/notifications.service';

const TEMPLATE_FOR_TG: string = 'НОВАЯ ЗАЯВКА НА БРОНЬ!\n';

@Controller('request')
@ApiTags('Requests')
export class RequestController {
    constructor(
        private requestService: RequestService,
        private telegramService: TelegramBotService,
        private notificationService: NotificationsService,
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
            await this.notificationService.generateAndSendPushNewRequest();
            return new RequestDto(savedRequest);
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }
    }
    
    @ApiOperation({ summary: 'Получить все заявки' })
    @ApiResponse({ status: 200, type: [RequestDto] })
    @UseGuards(AuthGuard)
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    @Get()
    async getAll(@Query('from') from: string, @Query('to') to: string) {
        try {
            const requests = await this.requestService.getAll(from, to);
            const respArr = requests.map(el => new RequestDto(el));
            return respArr;
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }
    
        @ApiOperation({ summary: "Отметить заявку обработанной/актуальной" })
        @ApiResponse({ status: 200, type: RequestDto })
        @UseGuards(AuthGuard)
        @ApiParam({ name: 'id', required: true})
        @Patch('/change-actual/:id')
        async chancgeActual(@Param('id') id: number) {
            try {
                const request = await this.requestService.getOne(id);
                if (!request) throw new HttpException(`Заявка c ID '${id}' не найдена`, 400);
                request.actual = request.actual ? false : true;
                const savedRequest: Request = await this.requestService.update(request);
                return new RequestDto(savedRequest);
            } catch (error) {
                throw new HttpException(error.message, error.status || 500);
            }
        }
}
