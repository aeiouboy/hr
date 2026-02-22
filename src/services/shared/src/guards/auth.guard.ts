import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, CurrentUser } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.decodeToken(token);
      request.user = this.mapPayloadToUser(payload);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private decodeToken(token: string): JwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
    return payload as JwtPayload;
  }

  private mapPayloadToUser(payload: JwtPayload): CurrentUser {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.preferred_username,
      firstName: payload.given_name,
      lastName: payload.family_name,
      roles: payload.realm_access?.roles ?? [],
    };
  }
}
