import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from '../users/dto/signin-user.dto';
import { CreateUserResidentDto } from '../users/dto/create-user-resident.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserResidentDto: CreateUserResidentDto) {
    return this.authService.register(createUserResidentDto);
  }

  @Public()
  @Post('signin')
  async signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }
}
