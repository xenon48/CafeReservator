import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginDto } from 'src/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @ApiOperation({ summary: 'Аутентификация' })
    @ApiResponse({ status: 200, type: String })
    @ApiBody({ type: loginDto })
    @Post()
    async login(@Body() dto: loginDto) {
        return await this.authService.login(dto);
    }
}
