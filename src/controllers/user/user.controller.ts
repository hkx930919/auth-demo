import { UserService } from 'src/controllers/user/user.service';
import {
  Controller,
  UseGuards,
  Get,
  Request,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/controllers/auth/jwt.strategy';
import { query } from 'express';
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  async createUser(@Body() data) {
    const res = await this.userService.create(data);
    return {
      code: 0,
      data: res,
    };
  }
  @Get()
  async findAll(@Request() req, @Query('ids') ids) {
    const params = ids.split(',');
    console.log('params', params);
    const res = await this.userService.query(params);
    return {
      code: 0,
      data: res,
    };
  }
  @Post('/update')
  async updateUser(@Body() body) {
    console.log('body', body);
    const res = await this.userService.update(body);
    return {
      code: 0,
      data: res,
    };
  }
  @Post('/delete')
  async deleteUser(@Body('id') id) {
    const res = await this.userService.delete(id);
    return {
      code: 0,
      success: true,
      data: null,
    };
  }
}
