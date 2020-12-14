import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { PhotoModule } from './controllers/photo/photo.module';
import { AlbumModule } from './controllers/album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { Photo } from './entity/photo.entity';
import { Album } from './entity/album.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PhotoModule,
    AlbumModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      // entities: [`${__dirname}/entity/**.ts`],
      entities: [UserEntity, Photo, Album],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
