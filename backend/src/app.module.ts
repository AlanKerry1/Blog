import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/posts.model';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { Tokens } from './auth/entities/tokens.model';
import { ConfigModule } from '@nestjs/config';
import { Users } from './auth/entities/users.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
      entities: [Users, Posts, Tokens],
      synchronize: true,
    }),
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}
