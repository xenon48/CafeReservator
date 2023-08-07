import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }


    async login(dto: loginDto) {
        let user: User
        try {
            user = await this.userService.findByLogin(dto.login)
        } catch (error) {
            throw new HttpException(`Ошибка БД: ${error.message}`, 500);
        }
        if (!user) { throw new HttpException("Пользователь не найден", 400);
         }
        if (user.password === dto.password) {
            return { token: await this.jwtService.signAsync({ login: user.login, id: user.id }) }
        }
        else throw new HttpException('Неверный пароль', 401)
    }
}
