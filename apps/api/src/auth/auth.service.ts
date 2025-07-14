import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SupabaseService } from './supabase.service';
import { RegisterDto, LoginDto } from './dto';
import {
  isEmptyString,
  isNotNullOrUndefined,
  isNullOrUndefined,
} from '@poke-playbook/libs';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {}

  async register(
    { email, password, firstName, lastName }: RegisterDto,
    response: Response,
  ) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (isNotNullOrUndefined(error)) {
      throw new BadRequestException(error.message);
    }

    if (isNotNullOrUndefined(data.session)) {
      this.setAuthCookie(response, data.session.access_token);
    }

    if (isNullOrUndefined(data.user)) {
      throw new BadRequestException('User registration failed');
    }

    if (isNullOrUndefined(data.user.email)) {
      throw new BadRequestException('User email is required');
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.user_metadata?.first_name ?? null,
        lastName: data.user.user_metadata?.last_name ?? null,
        createdAt: data.user.created_at,
      },
      message: data.session
        ? 'Registration successful'
        : 'Please check your email to verify your account',
    };
  }

  async login({ email, password }: LoginDto, response: Response) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (isNotNullOrUndefined(error)) {
      throw new UnauthorizedException(error.message);
    }

    if (isNullOrUndefined(data.session)) {
      throw new UnauthorizedException('Login failed');
    }

    if (isNotNullOrUndefined(data.session)) {
      this.setAuthCookie(response, data.session.access_token);
    }

    if (isNullOrUndefined(data.user)) {
      throw new BadRequestException('User registration failed');
    }

    if (isEmptyString(data.user.email)) {
      throw new UnauthorizedException('User email is required');
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.user_metadata?.first_name ?? null,
        lastName: data.user.user_metadata?.last_name ?? null,
        createdAt: data.user.created_at,
      },
    };
  }

  async logout(response: Response) {
    this.clearAuthCookie(response);

    return { message: 'Logged out successfully' };
  }

  private setAuthCookie(response: Response, token: string) {
    const secure = this.configService.get('COOKIE_SECURE') === 'true';
    const sameSite = this.configService.get('COOKIE_SAME_SITE') as
      | 'lax'
      | 'strict'
      | 'none';
    const domain = this.configService.get('COOKIE_DOMAIN');
    const maxAge = parseInt(
      this.configService.get('COOKIE_MAX_AGE') || '604800000',
    ); // 7 days

    response.cookie('auth-token', token, {
      httpOnly: true,
      secure,
      sameSite,
      domain,
      maxAge,
      path: '/',
    });
  }

  private clearAuthCookie(response: Response) {
    const secure = this.configService.get('COOKIE_SECURE') === 'true';
    const sameSite = this.configService.get('COOKIE_SAME_SITE') as
      | 'lax'
      | 'strict'
      | 'none';
    const domain = this.configService.get('COOKIE_DOMAIN');

    response.clearCookie('auth-token', {
      httpOnly: true,
      secure,
      sameSite,
      domain,
      path: '/',
    });
  }
}
