import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegDto } from './dto/reg.dto';
import { Users } from './entities/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { TokensService } from './tokens/tokens.service';
import { UserPayloadDto } from './dto/user-payload.dto';
import { LogDto } from './dto/log.dto';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(Users) private usersRep: Repository<Users>,
    private tokenService: TokensService) {}

  async registration(registrationDto: RegDto) {
    const candidate = await this.usersRep.find({where: {email: registrationDto.email}});
    if (candidate.length) {
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(registrationDto.password, 3);
    const user = this.usersRep.create({username: registrationDto.username, email: registrationDto.email, password: hashedPassword});
    await this.usersRep.save(user);

    const userPayload = new UserPayloadDto(user);
    const tokens = this.tokenService.generateTokens({...userPayload});
    await this.tokenService.saveToken(userPayload.id, tokens.refreshToken);

    return tokens;
  }

  async login(loginDto: LogDto) {
    const candidate = await this.usersRep.findOne({where: {email: loginDto.email}});
    if (!candidate) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    const isPassEquals = await bcrypt.compare(loginDto.password, candidate.password);
    
    if (!isPassEquals) {
      throw new HttpException("Wrong password", HttpStatus.BAD_REQUEST);
    }

    const userPayload = new UserPayloadDto(candidate);
    const tokens = this.tokenService.generateTokens({...userPayload});
    await this.tokenService.saveToken(userPayload.id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
    }
    
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = this.tokenService.findToken(refreshToken);
    
    if(!userData || !tokenFromDB) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersRep.findOneBy({id: userData.id});
    const userPayload = new UserPayloadDto(user);
    const tokens = this.tokenService.generateTokens({...userPayload});
    await this.tokenService.saveToken(userPayload.id, tokens.refreshToken);

    return tokens;
  }
}
