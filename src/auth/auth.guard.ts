import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization ?? '';
    const token = bearer.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Не получен токен');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token, { secret: 'secret' }
      );
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Токен не актуален');
    }
    return true;
  }
}