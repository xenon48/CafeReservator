import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, createUserDto } from 'src/dto/user.dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [UserDto] })
    @Get()
    async getAll() {
        return await this.userService.findAll()
    }
    
    @ApiOperation({ summary: 'Редактировать пользователя' })
    @ApiResponse({ status: 201, type: UserDto })
    @ApiBody({ type: createUserDto, required: true })
    @Post()
    async create(@Body() dto: createUserDto) {
        return await this.userService.createOne(dto);
    }
}
