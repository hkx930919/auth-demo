import { PhotoService } from './photo.service';
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
@Controller('photo')
@UseGuards(JwtAuthGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}
  @Post('/create')
  async createPhoto(@Body() data) {
    const res = await this.photoService.create(data);
    return {
      code: 0,
      data: res,
    };
  }
  @Get('/query')
  async findAll(@Request() req, @Query('ids') ids) {
    let params;
    if (ids) {
      params = ids.split(',');
    }
    console.log('params', params);
    const res = await this.photoService.query(params);
    return {
      code: 0,
      data: res,
    };
  }
  @Post('/update')
  async updateUser(@Body() body) {
    console.log('body', body);
    const res = await this.photoService.update(body);
    return {
      code: 0,
      data: res,
    };
  }
  @Post('/delete')
  async deleteUser(@Body('id') id) {
    await this.photoService.delete(id);
    return {
      code: 0,
      success: true,
      data: null,
    };
  }
}
