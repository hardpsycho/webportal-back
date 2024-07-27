import { JwtService } from '@nestjs/jwt'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const bearer = req.headers.authorization
    const token = bearer?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sessionInfo = this.jwtService.verify(token, { secret: process.env.JWT_ACCESS_TOKEN});

      req['session'] = sessionInfo
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
