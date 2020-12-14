import { UserModule } from '../user/user.module';
import { AlbumController } from './album.controller';
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/entity/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), UserModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService], // 导出TypeOrmModule，这样其他模块引用该模块时，可以使用
})
export class AlbumModule {}
