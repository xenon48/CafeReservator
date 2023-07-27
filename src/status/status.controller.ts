import { Controller, Get, HttpException, Param, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Status } from 'src/entities/status.entity';

@ApiTags('Status')
@Controller('status')
@UseGuards(AuthGuard)
export class StatusController {
    constructor(
        private statusService: StatusService
    ) { }

    @ApiOperation({ summary: 'Получить все статусы' })
    @ApiResponse({ status: 200, type: [Status] })
    @Get()
    async getAll() {
        try {
            return await this.statusService.getAll();
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }

    @ApiOperation({ summary: 'Получить статус по ID' })
    @ApiResponse({ status: 200, type: [Status] })
    @ApiParam({ name: 'id', type: String, required: true })
    @Get(':id')
    async getOne(@Param('id') id: string) {
        try {
            const status = await this.statusService.getOne(id);
            if (!status) throw new HttpException(`Статус с ID: '${id}' не найден`, 400);
            return status;
        } catch (error) {
            throw new HttpException(error.message, error.status || 500);
        }
    }
}
