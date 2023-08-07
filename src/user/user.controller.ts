import { Body, Controller, Get, HttpException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
        const users = await this.userService.findAll();
        const dtos = users.map(user => new UserDto(user))
        return dtos;
    }

    @ApiOperation({ summary: 'Получить профиль себя' })
    @ApiResponse({ status: 200, type: UserDto })
    @Get('/me')
    async getMe(@Req() req) {
        const id = req.user.id;
        return await this.getOne(id);
    }

    @ApiOperation({ summary: 'Редактировать пользователя' })
    @ApiResponse({ status: 201, type: UserDto })
    @ApiBody({ type: createUserDto, required: true })
    @ApiParam({ name: 'id', type: String, required: true })
    @Put('/:id')
    async update(@Body() dto: createUserDto, @Param('id') id: number) {
        try {
            const user = await this.userService.findById(id);
            if (!user) throw new HttpException(`User с ID: '${id}' не найден`, 400)
            const updatedUser = { ...user, ...dto };
            const savedUser = await this.userService.save(updatedUser);
            return new UserDto(savedUser);
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }

    @ApiOperation({ summary: 'Получить одного пользователя' })
    @ApiResponse({ status: 200, type: UserDto })
    @ApiParam({ name: 'id', type: String, required: true })
    @Get('/:id')
    async getOne(@Param('id') id: number) {
        const user = await this.userService.findById(id);
        if (!user) throw new HttpException(`User с ID: '${id}' не найден`, 400);
        return new UserDto(user);
    }
}
