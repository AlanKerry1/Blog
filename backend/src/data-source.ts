import { DataSource } from 'typeorm';
import { Users } from './auth/entities/users.model';
import { Posts } from './posts/entities/posts.model';
import { Tokens } from './auth/entities/tokens.model';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'blog-db-1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'blog',
  entities: [Users, Posts, Tokens],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,  // миграции должны быть в приоритете, чтобы не ломать продакшен
});