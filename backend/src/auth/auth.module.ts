import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokensService } from './tokens/tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Tokens } from './entities/tokens.model';
import { Users } from './entities/users.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([Users, Tokens])
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensService, JwtService],
})
export class AuthModule {}
