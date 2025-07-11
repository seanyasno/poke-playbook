import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // TODO: Implement actual JWT token validation with Supabase
    // For now, allow all requests and set a placeholder user
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }

    // Placeholder: In real implementation, validate JWT and extract user info
    request.user = { id: 'temp-user-id' };

    return true;
  }
}
