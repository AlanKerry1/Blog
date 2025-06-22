import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tokens } from '../entities/tokens.model';

@Injectable()
export class TokensService {
    constructor(private jwtService: JwtService,
        @InjectRepository(Tokens) private tokenRep: Repository<Tokens>) {}

    generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            privateKey: process.env.JWT_ACCESS_SECRET,
            expiresIn: "30m"
        });
        const refreshToken = this.jwtService.sign(payload, {
            privateKey: process.env.JWT_REFRESH_SECRET,
            expiresIn: "30d"
        });

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_SECRET
            })
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET
            })
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenRep.find({ where: { user: { id: userId } } });
        if (tokenData.length) {
            await this.tokenRep.update({user: {id: userId}}, {...tokenData[0], refreshToken});
            return await this.tokenRep.findOne({where: {user: {id: userId}}});
        }
        const token = this.tokenRep.create({user: {id: userId}, refreshToken});
        this.tokenRep.save(token);
        return token;
    }

    async removeToken(refreshToken: string) {
        await this.tokenRep.delete({refreshToken});
    }

    async findToken(refreshToken: string) {
        await this.tokenRep.findOne({where: {refreshToken}});
    }
}
