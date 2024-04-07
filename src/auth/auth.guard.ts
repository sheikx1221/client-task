// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if ([ '/auth/login', '/user' ].includes(url)) return true;

    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = await this.authService.verifyToken(token);
        request.user = decoded;
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
}
