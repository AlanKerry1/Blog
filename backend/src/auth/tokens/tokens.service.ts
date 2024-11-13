import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
    constructor(private jwtService: JwtService) {}

    generateTokens(payload) {
        return this.jwtService.sign(payload, {
            privateKey: process.env.JWT_ACCESS_SECRET,
            expiresIn: "30m"
        });
    }
}
