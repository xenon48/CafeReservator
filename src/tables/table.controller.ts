import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TableService } from './table.service';
import { Table } from 'src/entities/table.entity';
import { setTimezone } from 'src/utils/utils';


@ApiTags('Tables')
@Controller('tables')
@UseGuards(AuthGuard)
export class TableController {
    constructor(
        private tableService: TableService,
    ) { }

    @ApiOperation({ summary: 'Получить все столы' })
    @ApiResponse({ status: 200, type: [Table] })
    @Get()
    async getAll() {
        try {
            return await this.tableService.getAll();
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }

    @ApiOperation({ summary: 'Получить свободные столы' })
    @ApiResponse({ status: 200, type: [Table] })
    @ApiQuery({ type: String, name: 'time', description: 'Дата и время предполагаемой брони', example: '2023-06-28T23:00', required: true })
    @ApiQuery({ type: Number, name: 'persons', description: 'Кол-во персон. Значение по умолчанию - 1', required: false })
    @Get('/free')
    async checkFreeTables(@Query('time') time: string, @Query('persons') persons: number) {
        try {
            return await this.tableService.getFree(time, persons)
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }
}
