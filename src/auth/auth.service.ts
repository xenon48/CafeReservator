import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from 'src/dto/login.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }


    async login(dto: loginDto) {
        const user: User = await this.userService.findByLogin(dto.login)
        if (user.password === dto.password) {
            return { token: this.jwtService.sign({ login: user.login }) }
        }
        else throw new HttpException('Неверный логин/пароль', HttpStatus.UNAUTHORIZED)
    }
}
