import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken({ sub, email }: JwtPayload): Promise<string> {
    return this.jwtService.signAsync({
      sub,
      email,
    });
  }
}
