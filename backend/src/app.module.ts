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
      host: 'blog-db-1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
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
