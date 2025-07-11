import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw error || new UnauthorizedException('Authentication required');
    }
    return user;
  }
}
