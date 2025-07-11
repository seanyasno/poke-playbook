import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    // TODO: Extract user ID from JWT token or request headers
    // For now, return a placeholder that can be replaced with actual auth
    return request.user?.id || 'temp-user-id';
  },
);
