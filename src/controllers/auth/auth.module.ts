import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/controllers/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constant';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
