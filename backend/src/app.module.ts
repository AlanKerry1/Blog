import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/posts.model';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { Tokens } from './auth/entities/tokens.model';
import { ConfigModule } from '@nestjs/config';
import { Users } from './auth/entities/users.model';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      serveRoot: "/api/static/"
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, Posts, Tokens],
      synchronize: true,
    }),
    PostsModule,
    AuthModule,
    FilesModule,
  ],
  providers: [],
})
export class AppModule {}
