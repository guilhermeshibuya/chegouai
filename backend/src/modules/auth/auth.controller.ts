import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { CreateUserResidentDto } from '../users/dto/create-user-resident.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserResidentDto: CreateUserResidentDto) {
    return this.authService.register(createUserResidentDto);
  }

  @Post('signin')
  async signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }
}
