import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log('req.user', req.user);
    const data = await this.authService.login(req.user);
    return data;
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return {
      code: 0,
      data: req.user,
    };
  }
}
