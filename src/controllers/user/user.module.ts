import { UserController } from './user.controller';
import { UserEntity } from './../../entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 导出TypeOrmModule，这样其他模块引用该模块时，可以使用
})
export class UserModule {}
