import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../auth/public.decorator';

export interface AuthenticatedUser {
  id: number;
  role?: string;
  [key: string]: unknown;
}

type AuthenticatedRequest = Request & { user?: AuthenticatedUser };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') return true;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Bearer token is required');

    try {
      const payload = await this.jwtService.verifyAsync<Record<string, unknown>>(token);
      const rawId = payload.sub ?? payload.userId ?? payload.id;
      const id = typeof rawId === 'number' ? rawId : Number(rawId);
      if (!Number.isSafeInteger(id) || id <= 0) {
        throw new UnauthorizedException('Token does not contain a valid user identity');
      }
      request.user = { ...payload, id, role: typeof payload.role === 'string' ? payload.role : undefined };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired bearer token');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) return null;
    const token = header.slice('Bearer '.length).trim();
    return token || null;
  }
}
