import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginDto } from 'src/dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @ApiOperation({ summary: 'Аутентификация' })
    @ApiResponse({ status: 200, description: 'Токен' })
    @ApiBody({ type: loginDto })
    @HttpCode(200)
    @Post()
    async login(@Body() dto: loginDto) {
        try {
            return await this.authService.login(dto);
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
}
