import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private moduleRef: ModuleRef,
  ) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
      //   passReqToCallback: true,
    });
  }
  /**
   * 通过passport的内置守卫AuthGuard触发local策略
   * Passport 根据从 validate() 方法返回的值自动创建一个 user 对象，并将其作为 req.user 分配给请求对象
   */
  async validate(
    // request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    console.log('--username', username);
    console.log('--password', password);
    // console.log('--request', request.body);
    const u = await this.authService.validateUser(username, password);
    if (!u) {
      throw new UnauthorizedException();
    }
    return u;
  }
}
/**
 * 本地守卫
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
