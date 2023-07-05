import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReservationDto, reservationDto } from 'src/dto/reservation.dto';
import { responceDto } from 'src/dto/responce.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Reservations')
@Controller('reservation')
// @UseGuards(AuthGuard)
export class ReservationController {
    constructor(
        private reservationService: ReservationService
    ) { }

    @ApiOperation({ summary: 'Получить все брони' })
    @ApiResponse({ status: 200, type: [reservationDto]})
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00:00' })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30:00' })
    @Get()
    async getAll(@Query('from') from: string, @Query('to') to: string) {
        try {
            const reservations = await this.reservationService.getAll(from, to);
            // const respArr = reservations.map(el => {
            //     return new reservationDto(el)
            // })
            // return new responceDto(respArr)
            return reservations;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: 'Создать бронь' })
    @ApiResponse({ status: 201, type: reservationDto })
    @ApiBody({ type: createReservationDto, required: true })
    @Post()
    async create(@Body() dto: createReservationDto) {
        try {
            return await this.reservationService.createOne(dto);
            // return new responceDto(new reservationDto(resp))
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
    @ApiQuery({ name: 'id', type: String, required: true })
    @Delete()
    async delete(@Query('id') id: string) {
        // let resp;
        // try {
        //     resp = await this.reservationService.delete(id);
        // } catch (error) {
        //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        // }
        // if (resp) {
        //     return `Бронь с ID: "${id}" удалена`
        // }
        // else { throw new HttpException('Объект не найден', HttpStatus.BAD_REQUEST); }
    }
}
