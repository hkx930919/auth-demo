import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/controllers/user/user.service';
import { User } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userName);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(payLoad: any) {
    return {
      accessToken: this.jwtService.sign(payLoad),
    };
  }
}
