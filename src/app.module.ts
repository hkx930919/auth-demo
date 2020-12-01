import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
