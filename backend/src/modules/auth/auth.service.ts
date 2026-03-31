import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthExceptions } from 'src/common/constants/business-errors';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new Error(AuthExceptions.EMAIL_ALREADY_IN_USE);
    }

    const configSalt = this.configService.get<number>('HASH_SALT_ROUNDS');
    const saltRounds = configSalt ? Number(configSalt) : 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async signin(
    signInUserDto: SignInUserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = signInUserDto;

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new Error(AuthExceptions.INVALID_CREDENTIALS);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error(AuthExceptions.INVALID_CREDENTIALS);
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
