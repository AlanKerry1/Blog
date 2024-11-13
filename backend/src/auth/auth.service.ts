import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegDto } from './dto/reg.dto';
import { User } from 'src/users/entities/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { TokensService } from './tokens/tokens.service';
import { UserPayloadDto } from './dto/user-payload.dto';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private usersRep: Repository<User>,
    private tokenService: TokensService) {}

  async registration(registrationDto: RegDto) {
    const candidate = await this.usersRep.find({where: {email: registrationDto.email}});
    if (candidate.length) {
      throw new HttpException("user already exists", HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(registrationDto.password, 3);
    const user = this.usersRep.create({username: registrationDto.email, email: registrationDto.email, password: hashedPassword});
    await this.usersRep.save(user);

    // const userDto = new UserPayloadDto(user);
    // const tokens = this.tokenService.generateTokens({...userDto});

    return user;
  }
}
