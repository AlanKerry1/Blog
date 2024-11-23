import { Body, Controller, Get, Post, Req, Res, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LogDto } from './dto/log.dto';
import { RegDto } from './dto/reg.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() regDto: RegDto, @Res({passthrough: true}) res: Response) {
    const tokens = await this.authService.registration(regDto);
    res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.json(tokens);
  }

  @Post("login")
  async login(@Body() logDto: LogDto, @Res({passthrough: true}) res: Response) {
    const tokens = await this.authService.login(logDto);
    res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.json(tokens);
  }

  @Post("logout")
  async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    const {refreshToken} = req.cookies;
    await this.authService.logout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200);
  }

  @Get("refresh")
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const tokens = await this.authService.refresh(refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
  }
}
