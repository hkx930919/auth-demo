import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtSecret } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }
  /**
   * 通过passport的内置守卫JwtAuthGuard触发jwt策略
   * Passport 验证Authorization后调用validate方法，并将payload当做参数传递进去
   * validate返回的数据会重新注入到request.user中去
   */
  async validate(payload: any) {
    console.log('---jwt payload', payload);

    return {
      userId: payload.id,
      userName: payload.userName,
      xx: 1,
      bb: 2,
    };
  }
}

/**
 * jwt守卫
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
