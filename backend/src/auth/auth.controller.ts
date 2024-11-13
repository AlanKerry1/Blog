import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegDto } from './dto/reg.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() regDto: RegDto) {
    return await this.authService.registration(regDto);
  }

  @Post()
  login(@Body() logDto: RegDto) {
    
  }

  @Post()
  logout() {

  }
}
