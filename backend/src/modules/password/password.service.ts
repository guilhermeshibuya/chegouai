import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    const saltRounds =
      Number(this.configService.get<number>('HASH_SALT_ROUNDS')) || 10;

    return bcrypt.hash(password, saltRounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
