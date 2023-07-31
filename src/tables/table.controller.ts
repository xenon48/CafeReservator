import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TableService } from './table.service';
import { Table } from 'src/entities/table.entity';


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
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
