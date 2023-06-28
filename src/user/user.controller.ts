import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    async getAll() {
        return await this.userService.findAll()
    }

    @Post()
    async create(@Body() dto) {
        return await this.userService.createOne(dto);
    }
}
