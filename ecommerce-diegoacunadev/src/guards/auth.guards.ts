import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from './roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    console.log('HEADER AUTHORIZATION ===>', authorization);

    if (!authorization) return false;

    const token = authorization.split(' ')[1];
    if (!token) return false;

    const secret = process.env.JWT_SECRET;

    try {
      const user = this.jwtService.verify(token, { secret });

      user.exp = new Date(user.exp * 1000).toLocaleString();

      user.iat = new Date(user.iat * 1000).toLocaleString();

      if (user.isAdmin) {
        user.roles = [Role.Admin];
      } else {
        user.roles = [Role.User];
      }

      request.user = user;

      console.log(user);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
