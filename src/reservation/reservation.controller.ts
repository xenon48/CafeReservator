import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Reservations')
@Controller('reservation')
@UseGuards(AuthGuard)
export class ReservationController {
    constructor(
        private reservationService: ReservationService,
    ) { }

    @ApiOperation({ summary: 'Получить все брони' })
    @ApiResponse({ status: 200, type: [reservationDto] })
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    @Get()
    async getAll(@Query('from') from: string, @Query('to') to: string) {
        try {
            const reservations = await this.reservationService.getAll(from, to);
            const respArr = reservations.map(el => new reservationDto(el))
            return respArr;
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }

    @ApiOperation({ summary: 'Получить одну бронь по ID' })
    @ApiResponse({ status: 200, type: reservationDto })
    @ApiParam({ name: 'id', type: Number, required: true })
    @Get(':id')
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
    @ApiResponse({ status: 201, type: [reservationDto] })
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    @ApiBody({ type: createReservationDto, required: true })
    @Post()
    async create(@Body() dto: createReservationDto, @Query('from') from: string, @Query('to') to: string) {
        try {
            await this.reservationService.createOne(dto);
            const reservations = await this.reservationService.getAll(from, to);
            const respArr = reservations.map(el => new reservationDto(el))
            return respArr;
            // return new reservationDto(await this.reservationService.getOne(resp.id));
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }

    }

    @ApiOperation({ summary: 'Редактировать бронь' })
    @ApiResponse({ status: 201, type: [reservationDto] })
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    @ApiBody({ type: createReservationDto, required: true })
    @ApiParam({ name: 'id', type: String, required: true })
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: createReservationDto, @Query('from') from: string, @Query('to') to: string) {
        try {
            const oldReservation = await this.reservationService.getOne(id);
            if (!oldReservation) throw new HttpException(`Бронь с ID: '${id}' не найденa`, 400);
            await this.reservationService.editOne(oldReservation, dto);
            const reservations = await this.reservationService.getAll(from, to);
            const respArr = reservations.map(el => new reservationDto(el));
            return respArr;
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);

        }
    }

    @ApiOperation({ summary: 'Удалить бронь' })
    @ApiResponse({ status: 200, type: [reservationDto] })
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    @ApiParam({ name: 'id', type: Number, required: true })
    @Delete(':id')
    async delete(@Param('id') id: number, @Query('from') from: string, @Query('to') to: string) {
        try {
            const reservation = await this.reservationService.getOne(id);
            if (!reservation) { throw new HttpException(`Бронь с ID: '${id}' не найденa`, 400) }
            const resp = await this.reservationService.delete(id);
            if (resp.affected > 0) {
                const reservations = await this.reservationService.getAll(from, to);
                const respArr = reservations.map(el => new reservationDto(el));
                return respArr;
            } else throw new HttpException(`Ошибка при удалении`, 400);

        } catch (error) {
            throw new HttpException(`Ошибка при удалении: ${error.message}`, error.status || 500);
        }
    }
}
