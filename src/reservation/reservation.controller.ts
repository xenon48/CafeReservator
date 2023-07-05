import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';
import { responceDto } from 'src/dto/responce.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Reservations')
@Controller('reservation')
// @UseGuards(AuthGuard)
export class ReservationController {
    constructor(
        private reservationService: ReservationService,
    ) { }

    @ApiOperation({ summary: 'Получить все брони' })
    @ApiResponse({ status: 200, type: [reservationDto]})
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00:00' })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30:00' })
    @Get()
    async getAll(@Query('from') from: string, @Query('to') to: string) {
        try {
            const reservations = await this.reservationService.getAll(from, to);
            const respArr = reservations.map(el => {
                return new reservationDto(el)
            })
            return respArr;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: 'Получить одну бронь по ID' })
    @ApiResponse({ status: 200, type: reservationDto })
    @ApiParam({ name: 'id', type: Number, required: true })
    @Delete(':id')
    async getOne(@Param('id') id: number) {
        try {
            const reservation = await this.reservationService.getOne(id);
            if (!reservation) { throw new HttpException(`Бронь с ID: '${id}' не найденa`, 400) }
            return new reservationDto(reservation);
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }
    }

    @ApiOperation({ summary: 'Создать бронь' })
    @ApiResponse({ status: 201, type: reservationDto })
    @ApiBody({ type: createReservationDto, required: true })
    @Post()
    async create(@Body() dto: createReservationDto) {
        try {
            const resp = await this.reservationService.createOne(dto);
            return new reservationDto(await this.reservationService.getOne(resp.id));
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }

    }

    @ApiOperation({ summary: 'Редактировать бронь' })
    @ApiResponse({ status: 201, type: reservationDto })
    @ApiBody({ type: createReservationDto, required: true })
    @ApiQuery({ name: 'id', type: String, required: true })
    @Put()
    async update(@Query('id') id: string, @Body() dto: createReservationDto) {
        // let resp;
        // try {
        //     resp = await this.reservationService.editOne(dto, id);
        // } catch (error) {
        //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        // }
        // if (resp) {
        //     return new responceDto(new reservationDto(resp))
        // }
        // else { throw new HttpException('Объект не найден', HttpStatus.BAD_REQUEST); }
    }

    @ApiOperation({ summary: 'Удалить бронь' })
    @ApiResponse({ status: 200, type: String })
    @ApiParam({ name: 'id', type: Number, required: true })
    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            const reservation = await this.reservationService.getOne(id);
            if (!reservation) { throw new HttpException(`Бронь с ID: '${id}' не найденa`, 400) }
            await this.reservationService.delete(id);
            return 'Успешно удалено'
        } catch (error) {
            throw new HttpException(`Ошибка при удалении: ${error.message}`, error.status || 500);
        }
    }
}
