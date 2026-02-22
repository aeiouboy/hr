import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser as CurrentUserType } from '../interfaces/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserType | undefined, ctx: ExecutionContext): CurrentUserType | unknown => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as CurrentUserType;
    return data ? user?.[data] : user;
  },
);
