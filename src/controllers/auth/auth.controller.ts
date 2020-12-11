import { UserService } from 'src/controllers/user/user.service';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
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
    console.log(req.user);

    return {
      code: 0,
      data: req.user,
    };
  }
  @Get('/user')
  async findUser() {
    const data = await this.userService.query();
    return {
      code: 0,
      data,
    };
  }
}
