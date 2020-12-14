import { UserModule } from './../user/user.module';
import { PhotoController } from './photo.controller';
import { Photo } from '../../entity/photo.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), UserModule],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService], // 导出TypeOrmModule，这样其他模块引用该模块时，可以使用
})
export class PhotoModule {}
