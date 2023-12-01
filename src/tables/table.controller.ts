import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TableService } from './table.service';
import { Table } from 'src/entities/table.entity';
import { TableDto, TableExtendsDto } from 'src/dto/table.dto';


@ApiTags('Tables')
@Controller('tables')
@UseGuards(AuthGuard)
export class TableController {
    constructor(
        private tableService: TableService,
    ) { }

    @ApiOperation({ summary: 'Получить все столы' })
    @ApiResponse({ status: 200, type: [TableDto] })
    @Get()
    async getAll() {
        try {
            const tables: Table[] = await this.tableService.getAll();
            const tablesDto: TableDto[] = tables.map(table => new TableDto(table));
            return tablesDto;
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }

    @ApiOperation({ summary: 'Получить столы с указанной занятостью по запрошенному времени', description: "Массив всех столов с полем 'free', рассчитанным по запрошенному времени" })
    @ApiResponse({ status: 200, type: [TableExtendsDto] })
    @ApiQuery({ type: String, name: 'time', description: 'Дата и время предполагаемой брони', example: '2023-06-28T23:00', required: true })
    @Get('/free')
    async checkFreeTables(@Query('time') time: string) {
        try {
            const reservedTablesIds: string[] = await this.tableService.getFree(time);
            const tables: Table[] = await this.tableService.getAll();
            const tablesDto: TableDto[] = tables.map(table => {
                table.free = reservedTablesIds.includes(table.id) ? false : true;
                return new TableExtendsDto(table);
            });
            return tablesDto;
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }
}
