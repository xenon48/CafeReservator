import { Controller, Get, HttpException, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TableService } from './table.service';
import { tableDetialDto, tableDto } from 'src/dto/table.dto';
import { ReservationService } from 'src/reservation/reservation.service';

@ApiTags('Tables')
@Controller('tables')
@UseGuards(AuthGuard)
export class TableController {
    constructor(
        private tableService: TableService,
        private reservationsService: ReservationService
    ) { }

    @ApiOperation({ summary: 'Получить все столы' })
    @ApiResponse({ status: 200, type: [tableDto] })
    @Get()
    async getAll() {
        try {
            const tables = await this.tableService.getAll();
            return tables.map(el => new tableDto(el));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @ApiOperation({ summary: 'Получить все столы (включая брони)' })
    // @ApiResponse({ status: 200, type: [tableDetialDto] })
    // @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    // @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    // @Get('/detail')
    // async getAllDetail(@Query('from') from: string, @Query('to') to: string) {
    //     try {
    //         const tables = await this.tableService.getAll(from, to);
    //         return tables.map(el => new tableDetialDto(el));
    //     } catch (error) {
    //         throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    @ApiOperation({ summary: 'Получить стол (включая брони)' })
    @ApiResponse({ status: 200, type: tableDetialDto })
    @ApiQuery({ name: 'from', description: 'Дата, левая граница', example: '2023-06-28T23:00', required: false })
    @ApiQuery({ name: 'to', description: 'Дата, правая граница', example: '2023-06-30T12:30', required: false })
    @Get('/:id')
    async getAllDetail(@Query('from') from: string, @Query('to') to: string, @Param('id') id: string) {
        try {
            let table = await this.tableService.getOne(id.toUpperCase());
            if (!table) throw new HttpException(`Стол с ID: '${id}' не найден`, 400);
            const reservations = await this.reservationsService.getAll(from, to, id.toUpperCase());
            table.reservations = reservations;
            return new tableDetialDto(table);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
